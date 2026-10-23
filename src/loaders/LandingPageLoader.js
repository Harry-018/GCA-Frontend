import {
  getBanner,
  getAcademicPrograms,
  getChildrenActivities,
  getMissionVision,
  getReasons,
  getVideo,
} from "../requests/homepageRequests.js";

export const landingPageLoader = async () => {
  const [banner, acadprog, childact, missionvision, reasons, video] =
    await Promise.all([
      getBanner(),
      getAcademicPrograms(),
      getChildrenActivities(),
      getMissionVision(),
      getReasons(),
      getVideo(),
    ]);

  return {
    banner,
    acadprog: Array.isArray(acadprog) ? acadprog : [],
    childact: Array.isArray(childact?.r) ? childact.r : [],
    missionvision: Array.isArray(missionvision)
      ? (missionvision[0] ?? null)
      : (missionvision ?? null),
    reasons: Array.isArray(reasons) ? reasons : [],
    video: Array.isArray(video) ? (video[0] ?? null) : (video ?? null),
  };
};
