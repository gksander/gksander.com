import katex from "katex";

export const m = (str: string) =>
  katex.renderToString(str, { throwOnError: false });
