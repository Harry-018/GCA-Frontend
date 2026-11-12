import API from "../api/api.js";

export const getTeachers = async ({
  status = "all",
  search = "",
  page = 1,
  limit = 10,
}) => {
  const response = await API.get("/api/teachers", {
    params: {
      status,
      search,
      page,
      limit,
    },
  });

  return response.data;
};

export const getTeacherInfo = async (teacher_id) => {
  const response = await API.get(`/api/teachers/${teacher_id}`);

  return response.data;
};

export const createRegistrationInvitation = async (email) => {
  const response = await API.post("/api/teacher-registration", {
    email,
  });

  return response.data;
};

export const updateTeacher = async (teacher_id, data) => {
  const response = await API.patch(`/api/teachers/${teacher_id}`, data);

  return response.data;
};

// TEACHER ACCOUNT REQUESTS

export const getTeacherInfoByUserId = async () => {
  const response = await API.get("/api/teachers/me");
  return response.data;
};

export const editTeacherInfo = async (data) => {
  const response = await API.patch("/api/teachers/me", data);
  return response.data;
};

export const getTeacherSchedules = async () => {
  const response = await API.get("/api/teachers/me/schedules");
  return response.data;
};

export const getAssignedSections = async () => {
  const response = await API.get("/api/teachers/me/assigned-sections");
  return response.data;
};

export const getAttendanceStudents = async (section_id, date) => {
  const response = await API.get("/api/teachers/me/attendance/students", {
    params: {
      section_id,
      date,
    },
  });

  return response.data;
};

export const saveAttendance = async (section_id, date, attendance) => {
  const response = await API.post("/api/teachers/me/attendance", {
    section_id,
    date,
    attendance,
  });

  return response.data;
};

export const getMonthlyAttendanceReport = async (section_id, month, year) => {
  const response = await API.get("/api/teachers/me/attendance/report", {
    params: {
      section_id,
      month,
      year,
    },
  });

  return response.data;
};
