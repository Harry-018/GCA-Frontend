import API from "../api/api.js";

// BANNER
// ======================================================

export const getBanner = async () => {
  const response = await API.get("/api/homepage/banner");

  return response.data;
};

export const editBanner = async (data) => {
  const response = await API.patch("/api/homepage/banner", data);

  return response.data;
};

// ======================================================
// VIDEO
// ======================================================

export const getVideo = async () => {
  const response = await API.get("/api/homepage/video");

  return response.data;
};

export const editVideo = async (formData) => {
  const response = await API.patch("/api/homepage/video", formData);

  return response.data;
};

// ======================================================
// CHOOSE US / REASONS
// ======================================================

export const getReasons = async () => {
  const response = await API.get("/api/homepage/reasons");

  return response.data;
};

export const addReason = async (data) => {
  const response = await API.post("/api/homepage/reasons", data);

  return response.data;
};

export const editReason = async (reason_id, data) => {
  const response = await API.patch(`/api/homepage/reasons/${reason_id}`, data);

  return response.data;
};

export const deleteReason = async (reason_id) => {
  const response = await API.delete(`/api/homepage/reasons/${reason_id}`);

  return response.data;
};

// ======================================================
// ACADEMIC PROGRAMS
// ======================================================

export const getAcademicPrograms = async () => {
  const response = await API.get("/api/homepage/academic-programs");

  return response.data;
};

export const getGradeLevels = async () => {
  const response = await API.get("/api/homepage/grade-levels");

  return response.data;
};

export const addAcademicProgram = async (data) => {
  const response = await API.post("/api/homepage/academic-programs", data);

  return response.data;
};

export const editAcademicProgram = async (program_id, data) => {
  const response = await API.patch(
    `/api/homepage/academic-programs/${program_id}`,
    data,
  );

  return response.data;
};

export const deleteAcademicProgram = async (program_id) => {
  const response = await API.delete(
    `/api/homepage/academic-programs/${program_id}`,
  );

  return response.data;
};

// ======================================================
// MISSION & VISION
// ======================================================

export const getMissionVision = async () => {
  const response = await API.get("/api/homepage/mission-vision");

  return response.data;
};

export const editMissionVision = async (data) => {
  const response = await API.patch("/api/homepage/mission-vision", data);

  return response.data;
};

// ==================== Children Activities ====================

export const getChildrenActivities = async () => {
  const response = await API.get("/api/homepage/children-activities");

  return response.data;
};

export const addChildrenActivity = async (data) => {
  const response = await API.post("/api/homepage/children-activities", data);

  return response.data;
};

export const editChildrenActivity = async (activity_id, data) => {
  const response = await API.patch(
    `/api/homepage/children-activities/${activity_id}`,
    data,
  );

  return response.data;
};

export const deleteChildrenActivity = async (activity_id) => {
  const response = await API.delete(
    `/api/homepage/children-activities/${activity_id}`,
  );

  return response.data;
};
