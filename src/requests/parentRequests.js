import API from "../api/api.js";

export const getParentInfoByUserId = async () => {
  const response = await API.get("/api/parents/me");
  return response.data;
};
export const editParentInfo = async (data) => {
  const response = await API.patch("/api/parents/me", {
    contact_number: data.contact_number,
    email: data.email,
  });

  return response.data;
};
