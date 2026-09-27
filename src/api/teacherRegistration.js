import API from "./api";

export const verifyTeacherRegistration = async (token) => {
  const response = await API.get(`/api/teacher-registration/verify/${token}`);

  return response.data;
};
