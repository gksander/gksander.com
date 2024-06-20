import twConfig from "../../tailwind.config.mjs";
import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { get } from "lodash-es";

const SansFont = fs.readFileSync(
  path.resolve("./src/assets/fonts/Montserrat-Regular.ttf"),
);
const BoldFont = fs.readFileSync(
  path.resolve("./src/assets/fonts/Montserrat-Bold.ttf"),
);

const black = get(twConfig, "theme.extend.colors.black.DEFAULT") as string;
const blackLight = get(twConfig, "theme.extend.colors.black.light") as string;
const accent = get(twConfig, "theme.extend.colors.accent.DEFAULT") as string;
const background = get(
  twConfig,
  "theme.extend.colors.background.DEFAULT",
) as string;

type OgImageCallbackArgs = {
  colors: {
    black: string;
    blackLight: string;
    background: string;
    accent: string;
  };
  rootStyle: string;
  html: typeof html;
};

export async function createOgImage(
  callback: (args: OgImageCallbackArgs) => unknown,
) {
  const texture = await fsp
    .readFile(path.resolve(process.cwd(), "public/img/concrete-wall.png"))
    .then((b) => b.toString("base64"));

  const out = callback({
    colors: { black, background, blackLight, accent },
    html,
    rootStyle: `display: flex; flex-direction: column; padding: 40px; bottom: 0; width: 1200px; height: 630px; background-color: ${background}; background-image: url(data:image/png;base64,${texture});`,
  });

  const svg = await satori(out as ReactNode, {
    fonts: [
      {
        name: "Montserrat",
        data: Buffer.from(SansFont),
        style: "normal",
      },
      {
        name: "Montserrat",
        data: Buffer.from(BoldFont),
        weight: 800,
        style: "normal",
      },
    ],
    height: HEIGHT,
    width: WIDTH,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: WIDTH,
    },
  });

  return new Response(resvg.render().asPng(), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

const WIDTH = 1200;
const HEIGHT = 630;
