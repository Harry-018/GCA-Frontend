import API from "../api/api.js";

export const getParentInfoByUserId = async () => {
  const response = await API.get("/api/parents/me");
  return response.data;
};

export const editParentInfoByUserId = async (data) => {
  const response = await API.patch("/api/parents/me", data);
  return response.data;
};

export const getParentDashboardStudents = async () => {
  const response = await API.get("/api/parents/me/dashboard/students");
  return response.data;
};

export const getParentAnnouncements = async () => {
  const response = await API.get("/api/parents/me/dashboard/announcements");
  return response.data;
};
