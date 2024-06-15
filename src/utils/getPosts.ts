import { getCollection } from "astro:content";
import sortBy from "lodash-es/sortBy";

export async function getPosts() {
  const externalPosts = await getCollection("externalPost");
  const posts = await getCollection("post");

  return sortBy([...externalPosts, ...posts], "pubDate").reverse();
}
