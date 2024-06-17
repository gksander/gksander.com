import type { PropsWithChildren } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type DefinitionProps = {
  term: string;
  source?: {
    title: string;
    url: string;
  };
};

export function Definition({
  term,
  children,
  source,
}: PropsWithChildren<DefinitionProps>) {
  return (
    <div className="p-3 -ml-3 bg-gradient-to-tl from-background-dark text-black-light rounded-lg overflow-hidden not-prose flex flex-col gap-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold">{term}</span>
        {source && (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-1"
          >
            <span>source</span>
            <FaExternalLinkAlt className="w-2" />
          </a>
        )}
      </div>
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}
