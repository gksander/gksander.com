import { FaCheck } from "@components/FaCheck";
import { OptimizedImage } from "@components/OptimizedImage";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { OptimizedImageDetails } from "src/utils/getOptimizedImageSrc";
import { MdExpandMore } from "react-icons/md";

type Props = {
  items: {
    title: string;
    company: string;
    description: string;
    time: string;
    logo?: OptimizedImageDetails;
    accomplishments?: string[];
  }[];
};

export function ExpandableBackground({ items }: Props) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, MAX_ITEMS_SHOWN);
  const restItems = items.slice(MAX_ITEMS_SHOWN);

  return (
    <div className="flex flex-col gap-12">
      <AnimatePresence initial={false} mode="popLayout">
        {visibleItems.map((item, idx) => (
          <ExperienceItemCard
            key={item.time}
            item={item}
            overflowIdx={Math.max(idx - MAX_ITEMS_SHOWN + 1, 0)}
          />
        ))}

        {!expanded ? (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button
              onClick={() => setExpanded(true)}
              className="rounded p-2 -ml-2 text-sm font-bold flex items-center gap-x-1"
            >
              And more <MdExpandMore className="inline-block" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ExperienceItemCard({
  item,
  overflowIdx = 0,
}: {
  item: Props["items"][number];
  overflowIdx?: number;
}) {
  return (
    <motion.div
      layout
      className="flex sm:gap-x-4 items-end"
      initial={{ opacity: 0, y: 5 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: overflowIdx * 0.15, duration: 0.3 },
      }}
    >
      <div className={clsx("flex flex-col gap-y-3 flex-1")}>
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: item.time }}
            className="text-xs text-black-light font-medium"
          />
          <div className="text-lg font-bold">
            {item.title} @ {item.company}
          </div>
        </div>
        <div className="text-subtle-copy text-sm">{item.description}</div>
        {item.accomplishments && (
          <ul className="text-sm text-subtle-copy flex flex-col gap-y-1">
            {item.accomplishments.map((accomplishment) => (
              <li
                key={accomplishment}
                className="text-subtle-copy flex gap-x-2 items-start"
              >
                <FaCheck className="w-3.5 h-3.5 pt-1.5 shrink-0" />
                {accomplishment}
              </li>
            ))}
          </ul>
        )}
      </div>

      {item.logo && (
        <OptimizedImage
          image={item.logo}
          alt={`${item.company} logo`}
          className="hidden sm:block w-16 h-16 object-contain aspect-square flex-shrink-0 opacity-30 grayscale"
        />
      )}
    </motion.div>
  );
}

const MAX_ITEMS_SHOWN = 4;
