import type { PropsWithChildren } from "react";

type ExampleContainerProps = {
  title: string;
  instructions?: string;
};

export function ExampleContainer(
  props: PropsWithChildren<ExampleContainerProps>,
) {
  return (
    <div className="rounded-md shadow bg-gray-50 dark:bg-gray-700 not-prose">
      <div className="py-2 mb-2 px-3">
        <p className="font-medium mb-1">{props.title}</p>
        {props.instructions && (
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: props.instructions || "" }}
          />
        )}
      </div>
      <div className="py-2 px-3">{props.children}</div>
    </div>
  );
}
