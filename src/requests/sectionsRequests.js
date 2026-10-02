import API from "../api/api.js";

export const getSectionGradeLevels = async () => {
  const response = await API.get("/api/sections/grade-levels");

  return response.data;
};

export const getSectionsByGradeLevel = async (sy_grade_level_id) => {
  const response = await API.get(
    `/api/sections/grade-level/${sy_grade_level_id}`,
  );

  return response.data;
};

export const getSectionDetails = async (section_id) => {
  const response = await API.get(`/api/sections/${section_id}`);

  return response.data;
};

export const createSection = async (data) => {
  const response = await API.post("/api/sections", data);

  return response.data;
};

export const editSection = async (section_id, data) => {
  const response = await API.put(`/api/sections/${section_id}`, data);

  return response.data;
};

export const updateSectionStatus = async (section_id, status) => {
  const response = await API.patch(`/api/sections/${section_id}/status`, {
    status,
  });

  return response.data;
};

export const searchStudentsForSection = async (section_id, search = "") => {
  const response = await API.get(
    `/api/sections/${section_id}/students/search`,
    {
      params: {
        search,
      },
    },
  );

  return response.data;
};

export const addStudentsToSection = async (section_id, student_ids) => {
  const response = await API.post(`/api/sections/${section_id}/students`, {
    student_ids,
  });

  return response.data;
};

export const removeStudentsFromSection = async (section_id, student_ids) => {
  const response = await API.patch(
    `/api/sections/${section_id}/students/remove`,
    {
      student_ids,
    },
  );

  return response.data;
};

export const promoteStudents = async (
  student_ids,
  target_sy_grade_level_id,
) => {
  const response = await API.post(`/api/sections/promote`, {
    student_ids,
    target_sy_grade_level_id,
  });

  return response.data;
};

export const changeSectionTeacher = async (section_id, adviser_teacher_id) => {
  const response = await API.patch(`/api/sections/${section_id}/teacher`, {
    adviser_teacher_id,
  });

  return response.data;
};

export const getAdviserTeachers = async () => {
  const response = await API.get("/api/sections/advisers");

  return response.data;
};

export const getSectionNames = async () => {
  const response = await API.get("/api/settings/section-names");

  return response.data;
};
