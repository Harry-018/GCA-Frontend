import API from "../api/api.js";
import {
  getApplications,
  getRejectionReasons,
} from "../requests/preEnrollmentRequests.js";

export const getGradeLevels = async () => {
  try {
    const gradeLevels = await API.get("/api/academics/grade-level");

    return gradeLevels.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Backend Database Error Data:", error.response.data);
    }

    throw error;
  }
};

export const admissionLoader = async () => {
  const [applicationsResponse, rejectionReasonsResponse] = await Promise.all([
    getApplications({
      page: 1,
      limit: 10,
      application_status: "pending",
    }),
    getRejectionReasons(),
  ]);

  return {
    applications: applicationsResponse.data.data,
    pagination: applicationsResponse.data.pagination,
    rejectionReasons: rejectionReasonsResponse.data.data,
  };
};
