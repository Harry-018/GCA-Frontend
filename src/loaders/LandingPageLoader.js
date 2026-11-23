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
  const banner = await admissionPageLoader();

  return {
    banner,
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
