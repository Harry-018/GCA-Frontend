import API from "../api/api.js";

export const getParentInfoByUserId = async () => {
  const response = await API.get("/api/parents/me");
  return response.data;
};
