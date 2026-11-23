import { useQuery } from "@tanstack/react-query";

import {
  getAcademicPrograms,
  getBanner,
  getChildrenActivities,
  getMissionVision,
  getReasons,
  getVideo,
} from "../../requests/homepageRequests.js";
import { queryKeys } from "../../lib/queryKeys.js";
import { QUERY_STALE_TIME } from "../../lib/queryClient.js";

const staticOptions = {
  staleTime: QUERY_STALE_TIME.staticContent,
};

export const useHomepageBanner = () =>
  useQuery({
    queryKey: queryKeys.homepage.banner,
    queryFn: getBanner,
    ...staticOptions,
  });

export const useAcademicPrograms = () =>
  useQuery({
    queryKey: queryKeys.homepage.academicPrograms,
    queryFn: getAcademicPrograms,
    ...staticOptions,
  });

export const useChildrenActivities = () =>
  useQuery({
    queryKey: queryKeys.homepage.childrenActivities,
    queryFn: getChildrenActivities,
    ...staticOptions,
  });

export const useMissionVision = () =>
  useQuery({
    queryKey: queryKeys.homepage.missionVision,
    queryFn: getMissionVision,
    ...staticOptions,
  });

export const useReasons = () =>
  useQuery({
    queryKey: queryKeys.homepage.reasons,
    queryFn: getReasons,
    ...staticOptions,
  });

export const useHomepageVideo = () =>
  useQuery({
    queryKey: queryKeys.homepage.video,
    queryFn: getVideo,
    ...staticOptions,
  });
