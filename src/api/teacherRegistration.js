import API from "./api";

export const verifyTeacherRegistration = async (token) => {
  const response = await API.get(`/api/teacher-registration/verify/${token}`);

  return response.data;
};

export const submitTeacherRegistration = async (data) => {
  const response = await API.post("/api/teacher-registration/submit", data);

  return response.data;
};
