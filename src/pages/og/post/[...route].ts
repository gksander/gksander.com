import path from "node:path";
import fs from "node:fs";
import imageSize from "image-size";
import type { CollectionEntry } from "astro:content";
import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import type { ReactNode } from "react";
import { format } from "date-fns";
import twConfig from "../../../../tailwind.config.mjs";
import { get } from "lodash-es";

type BlogData = CollectionEntry<"post">["data"];
type Ext = ".avif" | ".jpeg";

const SansFont = fs.readFileSync(
  path.resolve("./src/assets/fonts/Montserrat-Regular.ttf"),
);
const BoldFont = fs.readFileSync(
  path.resolve("./src/assets/fonts/Montserrat-Bold.ttf"),
);

// Import all pages from the content directory
const rawPages = import.meta.glob("/src/content/**/*.mdx", {
  eager: true,
});

// Remove the /src/content/ prefix from the paths
const pages = Object.entries(rawPages).reduce<Record<string, BlogData>>(
  (acc, [path, page]) => {
    acc[path.replace("/src/content/post/", "")] = (
      page as { frontmatter: BlogData }
    ).frontmatter;
    return acc;
  },
  {},
);

export async function getStaticPaths() {
  const makeEntries = (ext: ".png") =>
    Object.entries(pages).map(([p, page]) => ({
      params: { route: p.replace(path.extname(p), "") + ext },
      props: { ...page, ext },
    }));

  return [...makeEntries(".png")];
}

const black = get(twConfig, "theme.extend.colors.black.DEFAULT") as string;
const blackLight = get(twConfig, "theme.extend.colors.black.light") as string;
const background = get(
  twConfig,
  "theme.extend.colors.background.DEFAULT",
) as string;

const texture = fs
  .readFileSync(path.resolve(process.cwd(), "public/img/concrete-wall.png"))
  .toString("base64");

export async function GET({ props }: { props: BlogData }) {
  const featuredImagePath = props.ogConfig?.featureImagePath;
  const imagePath = featuredImagePath
    ? path.resolve(process.cwd(), `src/assets/${featuredImagePath}`)
    : path.resolve(process.cwd(), "src/assets/headshot.png");
  const image = fs.readFileSync(imagePath).toString("base64");

  const shouldPadImage =
    props.ogConfig?.featureImagePath &&
    props.ogConfig?.featureImageFullBleed === false;

  const imagePadding = shouldPadImage ? 32 : 0;

  const out = html`<div
    style="display: flex; flex-direction: column; padding: 32px; bottom: 0; width: 1200px; height: 630px; background-color: ${background}; background-image: url(data:image/png;base64,${texture});"
  >
    <div
      style="display: flex; position: absolute; left: 0; right: 0; top: 0; bottom: 0;"
    ></div>

    <h1
      style="font-size: ${props.ogConfig?.titleFontSize ??
      64}px; font-weight: bold; padding-right: 16px; color: ${black}"
    >
      ${props.title}
    </h1>

    <div
      style="flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px;"
    >
      <div style="font-size: 48px; color: ${black}">Grant Sander</div>
      <div style="font-size: 32px; color: ${blackLight}">
        ${format(props.pubDate, "MMMM yyyy")}
      </div>
    </div>

    <img
      src="data:image/png;base64,${image}"
      style="width: ${props.ogConfig?.featureImageWidth ||
      350}px; position: absolute; right: ${imagePadding}; bottom: ${imagePadding};"
    />
  </div>`;

  const svg = await satori(out as ReactNode, {
    fonts: [
      {
        name: "Montserrat",
        data: Buffer.from(SansFont),
        style: "normal",
      },
      {
        name: "Montserrat",
        data: Buffer.from(BoldFont),
        weight: 800,
        style: "normal",
      },
    ],
    height: 630,
    width: 1200,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  return new Response(resvg.render().asPng(), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
