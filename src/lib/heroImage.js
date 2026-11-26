import { optimizeCloudinaryImage } from "./cloudinary.js";

// The hero is the LCP image. Serving 1600px to a phone wastes bandwidth, so
// offer a small set of widths and let the browser choose from its viewport and
// DPR. The loader preloads with the exact same srcset/sizes so the preloaded
// candidate is the one the <img> actually uses.
export const HERO_WIDTHS = [640, 960, 1280, 1600];

export const HERO_SIZES =
  "(max-width: 639px) calc(100vw - 24px), (max-width: 1023px) calc(100vw - 40px), min(calc(100vw - 112px), 1280px)";

export const heroSrc = (url) => optimizeCloudinaryImage(url, 1280);

export const heroSrcSet = (url) =>
  HERO_WIDTHS.map(
    (width) => `${optimizeCloudinaryImage(url, width)} ${width}w`,
  ).join(", ");
