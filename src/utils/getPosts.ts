import { getCollection } from "astro:content";
import sortBy from "lodash-es/sortBy";

export async function getPosts() {
  const externalPosts = await getCollection("externalPost");
  const posts = await getCollection("post", ({ data }) => data.draft !== true);

  return sortBy(
    [...externalPosts, ...posts],
    (post) => new Date(post.data.pubDate),
  ).reverse();
}
