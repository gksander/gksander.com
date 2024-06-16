import type { CollectionEntry } from "astro:content";
import { format } from "date-fns/format";

type Post = CollectionEntry<"externalPost"> | CollectionEntry<"post">;

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const { title, description, pubDate } = post.data;
  const formattedDate = format(post.data.pubDate, "MMMM yyyy");

  const href = isExternalPost(post) ? post.data.href : `/posts/${post.slug}`;

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        <div className="text-xs text-black-light font-medium">
          {formattedDate}
        </div>
        <a className="text-lg font-bold" href={href}>
          {title}
        </a>
      </div>
      <div className="text-sm text-subtle-copy">{description}</div>
    </div>
  );
}

function isExternalPost(post: Post): post is CollectionEntry<"externalPost"> {
  return "href" in post.data;
}
