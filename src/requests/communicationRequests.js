import API from "../api/api";

// =====================
// ANNOUNCEMENTS
// =====================

export const getGradeLevelsWithAnnouncementCount = async () => {
  const response = await API.get("/api/communications");

  return response.data;
};

export const getAnnouncementsByGradeLevel = async (sy_grade_level_id) => {
  const response = await API.get(`/api/communications/${sy_grade_level_id}`);

  return response.data;
};

export const createAnnouncement = async (sy_grade_level_id, data) => {
  const response = await API.post(
    `/api/communications/${sy_grade_level_id}`,
    data,
  );

  return response.data;
};

export const editAnnouncement = async (
  sy_grade_level_id,
  announcement_id,
  data,
) => {
  const response = await API.put(
    `/api/communications/${sy_grade_level_id}/${announcement_id}`,
    data,
  );

  return response.data;
};

export const deleteAnnouncement = async (
  sy_grade_level_id,
  announcement_id,
) => {
  const response = await API.delete(
    `/api/communications/${sy_grade_level_id}/${announcement_id}`,
  );

  return response.data;
};
