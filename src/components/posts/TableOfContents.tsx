import type { MarkdownHeading } from "astro";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function TableOfContents({ headings }: { headings: MarkdownHeading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio > 0) {
            setActive(entry.target.getAttribute("id"));
            break;
          }
        }
      },
      // { rootMargin: "-20% 0% 0px 0px" },
    );

    document.querySelectorAll("h2[id],h3[id],h4[id],h5[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <aside className="hidden lg:block h-fit sticky top-12">
      <h2 className="text-lg font-bold text-gray-600 dark:text-gray-200 mb-4">
        Table of Contents
      </h2>
      <div className="flex flex-col gap-y-2 text-sm">
        {headings.map((heading) => (
          <a
            key={heading.slug}
            className={clsx(
              "font-medium",
              LEFT_MAP[(heading.depth - 2) as keyof typeof LEFT_MAP],
              heading.slug === active
                ? "text-gradient"
                : "text-gray-500 dark:text-gray-300",
            )}
            href={`#${heading.slug}`}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </aside>
  );
}

const LEFT_MAP = {
  0: "ml-0",
  1: "ml-2",
  2: "ml-4",
  3: "ml-6",
  4: "ml-8",
};
