import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
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
    processor: unified({
      remarkPlugins: [
        [remarkToc],
        [
          shikiTwoslash.default,
          {
            themes: ["rose-pine-dawn"],
            defaultCompilerOptions: {
              ignoreDeprecations: "6.0",
            },
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
    mdx(),
    sitemap(),
  ],
});
