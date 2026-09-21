import API from "../api/api.js";
import {
  getApplications,
  getRejectionReasons,
  getApprovedApplicants,
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

const getLocalDate = () => {
  const date = new Date();

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

export const submissionDocsLoader = async () => {
  const today = getLocalDate();

  const response = await getApprovedApplicants(today, "", 1, 10);

  return {
    approvedApplicants: response.data.data,
    pagination: response.data.pagination,
  };
};
