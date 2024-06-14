import { OptimizedImage } from "@components/OptimizedImage";
import { clsx } from "clsx";
import { useState } from "react";
import type { OptimizedImageDetails } from "src/utils/getOptimizedImageSrc";

type Props = {
  items: {
    title: string;
    company: string;
    description: string;
    time: string;
    logo?: OptimizedImageDetails;
  }[];
};

export function ExpandableBackground({ items }: Props) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, MAX_ITEMS_SHOWN);

  return (
    <div className="flex flex-col gap-10">
      {visibleItems.map((item, index) => (
        <ExperienceItemCard
          key={item.time}
          item={item}
          isPrimary={index === 0}
        />
      ))}
      {!expanded && (
        <div>
          <button
            onClick={() => setExpanded(true)}
            className="rounded p-2 -ml-2 text-sm font-bold"
          >
            And more...
          </button>
        </div>
      )}
    </div>
  );
}

function ExperienceItemCard({
  isPrimary,
  item,
}: {
  item: Props["items"][number];
  isPrimary?: boolean;
}) {
  return (
    <div className="flex gap-x-4 items-end">
      <div
        className={clsx(
          "flex flex-col gap-y-2 flex-1",
          isPrimary ? "bg-opacity-90" : "bg-opacity-25",
        )}
      >
        <div className="flex-1 flex flex-col gap-y-0.5">
          <div className="font-semibold">{item.title}</div>
          <div className="text-subtle-copy text-sm">{item.description}</div>
        </div>

        <div className="text-black-light">
          <div className="font-bold text-sm">{item.company}</div>
          <div
            dangerouslySetInnerHTML={{ __html: item.time }}
            className="text-xs"
          />
        </div>
      </div>

      {item.logo && (
        <OptimizedImage
          image={item.logo}
          alt={`${item.company} logo`}
          className="block w-16 h-16 object-contain aspect-square flex-shrink-0 opacity-30 grayscale"
        />
      )}
    </div>
  );
}

const MAX_ITEMS_SHOWN = 4;
