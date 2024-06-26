import { createOgImage } from "@utils/ogUtils.ts";
import fsp from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const headshot = await fsp
    .readFile(path.resolve(process.cwd(), "src/assets/headshot-small.png"))
    .then((b) => b.toString("base64"));

  return createOgImage(
    ({ colors, html, rootStyle }) => html`
      <div style="${rootStyle}">
        <div
          style="font-size: 80px; color: ${colors.blackLight}; margin-bottom: 8px;"
        >
          I'm Grant.
        </div>
        <div style="font-size: 110px; color: ${colors.black};">
          I like to build.
        </div>

        <img
          src="data:image/png;base64,${headshot}"
          style="width: 450px; position: absolute; right: 0; bottom: 0;"
        />
      </div>
    `,
  );
}
