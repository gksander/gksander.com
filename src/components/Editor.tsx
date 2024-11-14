import * as React from "react";
import {
  Sandpack,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

type Props = {
  template?: SandpackPredefinedTemplate;
  files?: Record<string, string>;
  activeFile?: string;
  dependencies?: (keyof typeof DEPENDENCIES)[];
};

export function Editor({
  template = "react-ts",
  files,
  activeFile,
  dependencies,
}: Props) {
  const [isMounted, setIsMounted] = React.useState(false);

  const deps = React.useMemo(() => {
    return (dependencies ?? []).reduce(
      (acc, key) => {
        Object.assign(acc, DEPENDENCIES[key]);
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [dependencies]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="-mx-breakout-4 md:-mx-breakout-8 sp-editor relative isolate">
      <Sandpack
        template={template}
        theme={atomDark}
        files={files}
        customSetup={{
          dependencies: deps,
        }}
        options={{
          showConsoleButton: true,
          showInlineErrors: true,
          showLineNumbers: true,
          showTabs: true,
          editorHeight: 450,
          activeFile,
        }}
      />

      {!isMounted && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-lg z-10" />
      )}
    </div>
  );
}

const DEPENDENCIES = {
  framer11: { "framer-motion": "11.2.10" },
} satisfies Record<string, Record<string, string>>;
