import {
  getBanner,
  getAcademicPrograms,
  getChildrenActivities,
  getMissionVision,
  getReasons,
  getVideo,
} from "../requests/homepageRequests.js";
import {
  getTuition,
  getTuitionGradeLevels,
} from "../requests/tuitionRequests.js";
import { queryClient, QUERY_STALE_TIME } from "../lib/queryClient.js";
import { queryKeys } from "../lib/queryKeys.js";
import { HERO_SIZES, heroSrc, heroSrcSet } from "../lib/heroImage.js";

const asArray = (value) => (Array.isArray(value) ? value : []);

const firstOrNull = (value) =>
  Array.isArray(value) ? (value[0] ?? null) : (value ?? null);

const ensure = ({ queryKey, queryFn }) =>
  queryClient.ensureQueryData({
    queryKey,
    queryFn,
    staleTime: QUERY_STALE_TIME.staticContent,
  });

const stream = ({ queryKey, queryFn, transform = (value) => value, fallback }) =>
  Promise.resolve(ensure({ queryKey, queryFn }))
    .then(transform)
    .catch(() => fallback);

// Start the hero image request as soon as the banner resolves, before the
// HomePage chunk is even downloaded. CSS background images can't be
// preloaded declaratively because their URL is only known at runtime.
const preloadHeroImage = (url) => {
  if (typeof document === "undefined" || !url) return;

  const source = heroSrc(url);
  const exists = Array.from(
    document.querySelectorAll('link[rel="preload"][as="image"]'),
  ).some((link) => link.href === source);

  if (exists) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.fetchPriority = "high";
  link.href = source;
  link.imageSrcset = heroSrcSet(url);
  link.imageSizes = HERO_SIZES;
  document.head.appendChild(link);
};

// The banner is needed for the hero, so keep it awaited but never fail the route.
export const admissionPageLoader = async () => {
  try {
    return await ensure({
      queryKey: queryKeys.homepage.banner,
      queryFn: getBanner,
    });
  } catch {
    return null;
  }
};

export const landingPageLoader = async () => {
  // The hero is the LCP element, so await the banner and paint it once with
  // final content. Streaming it caused a late repaint and regressed LCP.
  const banner = await admissionPageLoader();

  preloadHeroImage(banner?.banner_image || "/image/kinder.webp");

  return {
    banner,
    // Below-fold sections stream independently with skeleton fallbacks.
    acadprog: stream({
      queryKey: queryKeys.homepage.academicPrograms,
      queryFn: getAcademicPrograms,
      transform: asArray,
      fallback: [],
    }),
    childact: stream({
      queryKey: queryKeys.homepage.childrenActivities,
      queryFn: getChildrenActivities,
      transform: (result) => asArray(result?.r),
      fallback: [],
    }),
    missionvision: stream({
      queryKey: queryKeys.homepage.missionVision,
      queryFn: getMissionVision,
      transform: firstOrNull,
      fallback: null,
    }),
    reasons: stream({
      queryKey: queryKeys.homepage.reasons,
      queryFn: getReasons,
      transform: asArray,
      fallback: [],
    }),
    video: stream({
      queryKey: queryKeys.homepage.video,
      queryFn: getVideo,
      transform: firstOrNull,
      fallback: null,
    }),
  };
};

// Grade levels are awaited (small, needed for tabs), then all tuition requests
// run in parallel so switching tabs never triggers a new request.
export const tuitionPageLoader = async () => {
  const levelsResult = await ensure({
    queryKey: queryKeys.tuition.gradeLevels,
    queryFn: getTuitionGradeLevels,
  }).catch(() => []);

  const gradeLevels = asArray(levelsResult);

  const tuitionByLevel = Promise.all(
    gradeLevels.map(async (grade) => {
      const result = await ensure({
        queryKey: queryKeys.tuition.fees(grade.grade_level_id),
        queryFn: () => getTuition(grade.grade_level_id),
      }).catch(() => []);

      return [grade.grade_level_name, asArray(result)];
    }),
  ).then((entries) => Object.fromEntries(entries));

  return { gradeLevels, tuitionByLevel };
};
