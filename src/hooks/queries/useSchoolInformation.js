import { useQuery } from "@tanstack/react-query";

import { getSchoolInformation } from "../../requests/settingsRequests.js";
import { queryKeys } from "../../lib/queryKeys.js";
import { QUERY_STALE_TIME } from "../../lib/queryClient.js";

export const useSchoolInformation = () =>
  useQuery({
    queryKey: queryKeys.schoolInformation,
    queryFn: async () => {
      const response = await getSchoolInformation();

      return response?.data ?? response ?? null;
    },
    staleTime: QUERY_STALE_TIME.staticContent,
  });
