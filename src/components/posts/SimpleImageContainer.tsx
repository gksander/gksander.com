import type { PropsWithChildren } from "react";

export const SimpleImageContainer = ({ children }: PropsWithChildren) => (
  <div className="border border-background-dark w-fit max-w-full rounded-lg overflow-hidden  mx-auto p-2">
    {children}
  </div>
);
