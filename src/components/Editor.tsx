import {
  Sandpack,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

type Props = {
  template?: SandpackPredefinedTemplate;
  files?: Record<string, string>;
  activeFile?: string;
};

export function Editor({ template = "react-ts", files, activeFile }: Props) {
  return (
    <div className="-mx-breakout-4 md:-mx-breakout-8 sp-editor">
      <Sandpack
        template={template}
        theme={atomDark}
        files={files}
        options={{
          showConsoleButton: true,
          showInlineErrors: true,
          showLineNumbers: true,
          showTabs: true,
          editorHeight: 450,
          activeFile,
        }}
      />
    </div>
  );
}
