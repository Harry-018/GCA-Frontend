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

export const getStudentSubjects = async (stu_id) => {
  const response = await API.get(
    `/api/parents/me/dashboard/students/${stu_id}/subjects`,
  );
  return response.data;
};

export const getStudentSubjectGrades = async (
  stu_id,
  subject_id,
  quarter_id,
) => {
  const response = await API.get(
    `/api/parents/me/dashboard/students/${stu_id}/subjects/${subject_id}/grades`,
    { params: { quarter_id } },
  );
  return response.data;
};

export const getStudentTeacherRemarks = async (stu_id, quarter_id) => {
  const response = await API.get(
    `/api/parents/me/dashboard/students/${stu_id}/teacher-remarks`,
    { params: { quarter_id } },
  );
  return response.data;
};
