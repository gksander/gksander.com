import {
  Sandpack,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import { gruvboxLight } from "@codesandbox/sandpack-themes";

type Props = {
  template?: SandpackPredefinedTemplate;
  files?: Record<string, string>;
};

export function Editor({ template = "react-ts", files }: Props) {
  return (
    <Sandpack
      template={template}
      theme={gruvboxLight}
      files={files}
      options={{
        showConsoleButton: true,
        showInlineErrors: true,
        showLineNumbers: true,
        showTabs: true,
        editorHeight: 450,
      }}
    />
  );
}
