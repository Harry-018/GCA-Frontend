import { getRecentApplicants } from "../requests/preEnrollmentRequests";

export const dashboardLoader = async () => {
  const response = await getRecentApplicants();

  return {
    recent_applicants: response.data.data,
  };
};
