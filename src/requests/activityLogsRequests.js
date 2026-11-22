import API from "../api/api.js";

export const getAdminActivityLogs = async ({ page = 1, limit = 10 } = {}) => {
  const response = await API.get("/api/activity-logs", {
    params: { page, limit },
  });

  return response.data;
};
