import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import shikiTwoslash from "remark-shiki-twoslash";
import autolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://gksander.com",
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
    react(),
    tailwind(),
    mdx({
      syntaxHighlight: false,
      shikiConfig: {
        theme: "one-dark-pro",
      },
      remarkPlugins: [
        [remarkToc],
        [
          shikiTwoslash.default,
          {
            themes: ["css-variables"],
          },
        ],
        remarkMath,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          autolinkHeadings,
          {
            behavior: "wrap",
          },
        ],
        rehypeKatex,
      ],
    }),
    sitemap(),
  ],
});
