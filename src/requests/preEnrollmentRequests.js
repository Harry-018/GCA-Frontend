import API from "../api/api";

export const applyApplication = async (data) => {
  return API.post(`/api/preEnrollment/application`, data);
};

export const getApplications = async ({
  page,
  limit = 10,
  application_status,
  search = "",
}) => {
  return API.get(`/api/preEnrollment/applications`, {
    params: {
      page,
      limit,
      application_status,
      search: search.trim(),
    },
  });
};

export const getApplicationById = (application_id) => {
  return API.get(`/api/preEnrollment/applications/${application_id}`);
};

export const approveApplicant = (data) => {
  return API.post("/api/preEnrollment/app-approval", data);
};

export const bulkApproveApplicants = (data) => {
  return API.patch("/api/preEnrollment/app-approval", data);
};

export const getRejectionReasons = () => {
  return API.get("/api/preEnrollment/rejection-reasons");
};

export const rejectApplicant = (application_id, rejection_reason_id) => {
  return API.patch(`/api/preEnrollment/applications/${application_id}/reject`, {
    rejection_reason_id,
  });
};

export const getApprovedApplicants = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  return API.get(`/api/preEnrollment/applications`, {
    params: {
      page,
      limit,
      application_status: "approved",
      search: search.trim(),
    },
  });
};
