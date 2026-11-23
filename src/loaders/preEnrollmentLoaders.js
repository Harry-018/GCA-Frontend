import API from "../api/api.js";
import {
  getApplications,
  getRejectionReasons,
  getApprovedApplicants,
} from "../requests/preEnrollmentRequests.js";
import { queryClient, QUERY_STALE_TIME } from "../lib/queryClient.js";
import { queryKeys } from "../lib/queryKeys.js";

const asArray = (value) => (Array.isArray(value) ? value : []);

const EMPTY_PAGINATION = { page: 1, limit: 10, totalPages: 0 };

const DEFAULT_APPLICATION_FILTERS = {
  page: 1,
  limit: 10,
  application_status: "pending",
  search: "",
};

const ensure = ({ queryKey, queryFn }) =>
  queryClient.ensureQueryData({
    queryKey,
    queryFn,
    staleTime: QUERY_STALE_TIME.tableData,
  });

export const getGradeLevels = async () => {
  try {
    const gradeLevels = await API.get("/api/academics/gradelevel-schoolyear");

    return gradeLevels.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Backend Database Error Data:", error.response.data);
    }

    throw error;
  }
};

export const admissionLoader = async () => {
  const applicationsResult = await ensure({
    queryKey: queryKeys.preEnrollment.applications(
      DEFAULT_APPLICATION_FILTERS,
    ),
    queryFn: async () => {
      const response = await getApplications(DEFAULT_APPLICATION_FILTERS);

      return {
        applications: asArray(response?.data?.data),
        pagination: response?.data?.pagination ?? EMPTY_PAGINATION,
      };
    },
  }).catch(() => ({ applications: [], pagination: EMPTY_PAGINATION }));

  const rejectionReasons = await ensure({
    queryKey: queryKeys.preEnrollment.rejectionReasons,
    queryFn: async () => {
      const response = await getRejectionReasons();

      return asArray(response?.data?.data);
    },
  }).catch(() => []);

  return {
    applications: applicationsResult.applications,
    pagination: applicationsResult.pagination,
    rejectionReasons,
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
  const filters = { date: today, search: "", page: 1, limit: 10 };

  const result = await ensure({
    queryKey: queryKeys.preEnrollment.approvedApplicants(filters),
    queryFn: async () => {
      const response = await getApprovedApplicants(
        filters.date,
        filters.search,
        filters.page,
        filters.limit,
      );

      return {
        applicants: asArray(response?.data?.data),
        pagination: response?.data?.pagination ?? EMPTY_PAGINATION,
      };
    },
  }).catch(() => ({ applicants: [], pagination: EMPTY_PAGINATION }));

  return {
    approvedApplicants: result.applicants,
    pagination: result.pagination,
  };
};
