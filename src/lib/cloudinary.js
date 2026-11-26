// Cloudinary serves the original CMS uploads at multi-megabyte sizes. Request
// a display-sized, auto-formatted derivative instead so images don't dominate
// LCP on public pages. Non-Cloudinary paths are returned untouched.
const UPLOAD_SEGMENT = /\/image\/upload\//;
const ALREADY_TRANSFORMED = /\/image\/upload\/[^/]*(?:w_|q_auto|f_auto)/;

export const optimizeCloudinaryImage = (url, width = 1200) => {
  if (typeof url !== "string" || !UPLOAD_SEGMENT.test(url)) return url;
  if (ALREADY_TRANSFORMED.test(url)) return url;

  return url.replace(
    UPLOAD_SEGMENT,
    `/image/upload/w_${width},q_auto,f_auto/`,
  );
};
