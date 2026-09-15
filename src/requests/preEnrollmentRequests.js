import API from "../api/api";

export const applyApplication = async (data) => {
  return API.post(`/api/preEnrollment/application`, data);
};
