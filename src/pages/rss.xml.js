import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection("post", ({ data }) => data.draft !== true);
  return rss({
    title: "Grant Sander",
    description: "Grant Sander's personal site.",
    site: context.site,
    customData: `<language>en-us</language>`,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/post/${post.slug}/`,
    })),
  });
}
