import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const post = defineCollection({
  loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    style: z.enum(["longform", "fiddle"]).optional().default("longform"),

    title: z.string(),
    description: z.string(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional().default([]),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => (typeof val === "string" ? new Date(val) : val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    draft: z.boolean().optional().default(false),

    // Whether or not to load Katex
    hasMath: z.boolean().optional().default(false),

    // Optional config for OG image
    ogConfig: z
      .object({
        colorMode: z.enum(["light", "dark"]).optional(),
        titleFontSize: z.number().optional(),
        featureImagePath: z.string().optional(), // relative to src/assets
        featureImageFullBleed: z.boolean().optional(),
        featureImageWidth: z.number().optional(), // default: 350
      })
      .optional(),
  }),
});

const externalPost = defineCollection({
  loader: glob({ base: "./src/content/externalPost", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    href: z.string(),
    platform: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => (typeof val === "string" ? new Date(val) : val)),
  }),
});

export const collections = { post, externalPost };
