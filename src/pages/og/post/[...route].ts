import path from "node:path";
import fs from "node:fs";
import type { CollectionEntry } from "astro:content";
import { format } from "date-fns";
import { createOgImage } from "@utils/ogUtils.ts";

type BlogData = CollectionEntry<"post">["data"];

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

  return createOgImage(({ colors, html, rootStyle }) => {
    return html`
      <div style="${rootStyle}">
        <h1
          style="font-size: ${props.ogConfig?.titleFontSize ??
          64}px; font-weight: bold; padding-right: 16px; color: ${colors.black}"
        >
          ${props.title}
        </h1>

        <div
          style="flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px;"
        >
          <div style="font-size: 48px; color: ${colors.black}">
            Grant Sander
          </div>
          <div style="font-size: 32px; color: ${colors.blackLight}">
            ${format(props.pubDate, "MMMM yyyy")}
          </div>
        </div>

        <img
          src="data:image/png;base64,${image}"
          style="width: ${props.ogConfig?.featureImageWidth ||
          350}px; position: absolute; right: ${imagePadding}; bottom: ${imagePadding};"
        />
      </div>
    `;
  });
}
