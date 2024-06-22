import type { ImageTransform } from "astro";
import { getImage } from "astro:assets";

export async function getOptimizedImageSrc(payload: ImageTransform) {
  const avif = await getImage({ ...payload, format: "avif" });
  const webp = await getImage({ ...payload, format: "webp" });

  return {
    src: [
      avif.src,
      webp.src,
      typeof payload.src === "string" ? payload.src : payload.src.src,
    ] as string[],
    attributes: avif.attributes,
  };
}

export type OptimizedImageDetails = Awaited<
  ReturnType<typeof getOptimizedImageSrc>
>;
