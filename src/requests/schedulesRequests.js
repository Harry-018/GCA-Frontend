import API from "../api/api.js";

export const getScheduleGradeLevels = async () => {
  const response = await API.get("/api/schedules/grade-levels");

  return response.data.data;
};

export const getScheduleSections = async (sy_grade_level_id) => {
  const response = await API.get(
    `/api/schedules/grade-levels/${sy_grade_level_id}/sections`,
  );

  return response.data.data;
};

export const getSectionSchedules = async (section_id) => {
  const response = await API.get(`/api/schedules/sections/${section_id}`);

  return response.data.data;
};

export const getScheduleSubjects = async (section_id) => {
  const response = await API.get(
    `/api/schedules/sections/${section_id}/subjects`,
  );

  return response.data.data;
};

export const getScheduleTeachers = async () => {
  const response = await API.get("/api/schedules/teachers");

  return response.data.data;
};

export const getScheduleRooms = async () => {
  const response = await API.get("/api/schedules/rooms");

  return response.data.data;
};

export const getScheduleDays = async () => {
  const response = await API.get("/api/schedules/days");

  return response.data.data;
};

export const getScheduleTimes = async () => {
  const response = await API.get("/api/schedules/times");

  return response.data.data;
};

export const createSchedule = async (data) => {
  const response = await API.post("/api/schedules", data);

  return response.data;
};

export const editSchedule = async (schedule_id, data) => {
  const response = await API.put(`/api/schedules/${schedule_id}`, data);

  return response.data;
};

export const deleteSchedule = async (schedule_id) => {
  const response = await API.delete(`/api/schedules/${schedule_id}`);

  return response.data;
};
