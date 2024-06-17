import type { PropsWithChildren } from "react";

export const SimpleImageContainer = ({ children }: PropsWithChildren) => (
  <div className="border dark:border-gray-700 w-fit max-w-full rounded-lg overflow-hidden shadow-md mx-auto p-2">
    {children}
  </div>
);
