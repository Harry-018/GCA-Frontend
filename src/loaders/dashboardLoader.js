import {
  getRecentApplicants,
  getDashboard,
} from "../requests/preEnrollmentRequests";

export const dashboardLoader = async () => {
  const [applicantsResponse, dashboardResponse] = await Promise.all([
    getRecentApplicants(),
    getDashboard(),
  ]);

  return {
    recent_applicants: applicantsResponse.data.data,
    dashboard: dashboardResponse.data,
  };
};
