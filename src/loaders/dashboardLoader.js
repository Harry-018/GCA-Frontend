import {
  getRecentApplicants,
  getDashboard,
} from "../requests/preEnrollmentRequests.js";
import { queryClient, QUERY_STALE_TIME } from "../lib/queryClient.js";
import { queryKeys } from "../lib/queryKeys.js";

const asArray = (value) => (Array.isArray(value) ? value : []);

const ensure = ({ queryKey, queryFn }) =>
  queryClient.ensureQueryData({
    queryKey,
    queryFn,
    staleTime: QUERY_STALE_TIME.tableData,
  });

export const dashboardLoader = async () => {
  const recentApplicants = await ensure({
    queryKey: queryKeys.recentApplicants,
    queryFn: async () => {
      const response = await getRecentApplicants();

      return asArray(response?.data?.data);
    },
  }).catch(() => []);

  const dashboard = await ensure({
    queryKey: queryKeys.dashboard(null),
    queryFn: async () => {
      const response = await getDashboard();

      return response?.data ?? {};
    },
  }).catch(() => ({}));

  const selectedSchoolYearId = dashboard?.selected_school_year_id;

  if (selectedSchoolYearId != null) {
    queryClient.setQueryData(
      queryKeys.dashboard(String(selectedSchoolYearId)),
      dashboard,
    );
  }

  return {
    recent_applicants: recentApplicants,
    dashboard,
  };
};
