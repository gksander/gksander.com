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
    <div>
      <a
        className="flex flex-col gap-y-3"
        href={href}
        target={isExternalPost(post) ? "_blank" : undefined}
        rel={isExternalPost(post) ? "noopener noreferrer" : undefined}
      >
        <div>
          <div className="text-xs text-black-light font-medium">
            {formattedDate}
          </div>
          <div className="text-lg font-bold">{title}</div>
        </div>
        <div className="text-sm text-subtle-copy">{description}</div>
      </a>
    </div>
  );
}

function isExternalPost(post: Post): post is CollectionEntry<"externalPost"> {
  return "href" in post.data;
}
