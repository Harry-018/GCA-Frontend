import api from "../../api/api";

export const authLogin = async (data) => {
  return api.post(`/api/auth/login`, data);
};
