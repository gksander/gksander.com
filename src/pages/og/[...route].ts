import path from "node:path";
import fs from "node:fs";
import imageSize from "image-size";
import type { CollectionEntry } from "astro:content";
import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import type { ReactNode } from "react";
import { format } from "date-fns";
import twConfig from "../../../tailwind.config.mjs";
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
    acc[path.replace("/src/content/", "")] = (
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

const blackLight = get(twConfig, "theme.extend.colors.black.light") as string;
const white = get(twConfig, "theme.extend.colors.white") as string;
const accent = get(twConfig, "theme.extend.colors.accent.DEFAULT") as string;
const accentLight = get(twConfig, "theme.extend.colors.accent.light") as string;

export async function GET({ props }: { props: BlogData }) {
  const out = html`<div
    style="display: flex; flex-direction: column; padding: 32px; bottom: 0; width: 1200px; height: 630px; background-image: linear-gradient(to bottom right, ${accent}, ${accentLight});"
  >
    <h1
      style="font-size: ${props.ogConfig?.titleFontSize ??
      64}px; font-weight: bold; padding-right: 16px; color: ${white}"
    >
      ${props.title}
    </h1>

    <div
      style="flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; color: ${white}"
    >
      <div style="font-size: 48px;">Grant Sander</div>
      <div style="font-size: 24px;">${format(props.pubDate, "MMMM yyyy")}</div>
    </div>
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

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
