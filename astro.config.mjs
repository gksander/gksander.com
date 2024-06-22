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
  output: "static",
  markdown: {
    syntaxHighlight: false,
  },
  vite: {
    ssr: {
      external: ["@resvg/resvg-js"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  integrations: [
    react(),
    tailwind(),
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [
        [remarkToc],
        [
          shikiTwoslash.default,
          {
            themes: ["rose-pine-dawn"],
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
