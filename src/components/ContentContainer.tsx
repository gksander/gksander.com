import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = {
  isFat?: boolean;
  className?: string;
  as?: "div" | "main";
};

export function ContentContainer({
  isFat = false,
  className,
  children,
  as: Element = "div",
}: PropsWithChildren<Props>) {
  return (
    <Element
      className={clsx([
        "container px-4 md:px-8",
        isFat ? "max-w-content" : "max-w-content",
        className,
      ])}
    >
      {children}
    </Element>
  );
}
