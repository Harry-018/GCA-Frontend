import API from "../api/api.js";

// =================
// SCHOOL INFORMATION
// =================

export const getSchoolInformation = async () => {
  const response = await API.get("/api/settings/school-information");

  return response.data;
};

export const updateSchoolInformation = async (data) => {
  const response = await API.put("/api/settings/school-information", data);

  return response.data;
};

// =================
// SECTION NAMES
// =================

export const getSectionNames = async () => {
  const response = await API.get("/api/settings/section-names");
  return response.data;
};

export const getArchivedSectionNames = async () => {
  const response = await API.get("/api/settings/section-names/archived");
  return response.data;
};

export const createSectionName = async (data) => {
  const response = await API.post("/api/settings/section-names", data);
  return response.data;
};

export const renameSectionName = async (section_name_id, data) => {
  const response = await API.patch(
    `/api/settings/section-names/${section_name_id}`,
    data,
  );
  return response.data;
};

export const archiveSectionName = async (section_name_id) => {
  const response = await API.patch(
    `/api/settings/section-names/${section_name_id}/archive`,
  );
  return response.data;
};

export const restoreSectionName = async (section_name_id) => {
  const response = await API.patch(
    `/api/settings/section-names/${section_name_id}/restore`,
  );
  return response.data;
};

// =================
// SUBJECTS
// =================

export const getGradeLevelsWithSubjectCount = async () => {
  const response = await API.get("/api/settings/grade-levels");

  return response.data;
};

export const getAllSubjects = async () => {
  const response = await API.get("/api/settings/subjects");

  return response.data;
};

export const createSubject = async (data) => {
  const response = await API.post("/api/settings/subjects", data);

  return response.data;
};

export const renameSubject = async (subjectId, data) => {
  const response = await API.patch(`/api/settings/subjects/${subjectId}`, data);

  return response.data;
};

export const removeSubject = async (subjectId) => {
  const response = await API.patch(`/api/subjects/${subjectId}/archive`);

  return response.data;
};

// export const getSubjectsByGradeLevel = async (gradeLevelId) => {
//   const response = await API.get(
//     `/api/settings/subjects/grade-level/${gradeLevelId}`,
//   );

//   return response.data;
// };

// export const addSubjectToGradeLevel = async (gradeLevelId, data) => {
//   const response = await API.post(
//     `/api/settings/subjects/grade-level/${gradeLevelId}`,
//     data,
//   );

//   return response.data;
// };

// export const removeSubjectFromGradeLevel = async (syGradelevelSubjectId) => {
//   const response = await API.patch(
//     `/api/settings/subjects/grade-level/assignment/${syGradelevelSubjectId}`,
//   );

//   return response.data;
// };

export const getSkillsBySubject = async (subjectId) => {
  const response = await API.get(`/api/settings/skills/subject/${subjectId}`);

  return response.data;
};

export const createSkill = async (data) => {
  const response = await API.post("/api/settings/skills", data);

  return response.data;
};

export const updateSkill = async (skillId, data) => {
  const response = await API.patch(`/api/settings/skills/${skillId}`, data);

  return response.data;
};

export const removeSkill = async (skillId) => {
  const response = await API.patch(`/api/settings/skills/${skillId}/archive`);

  return response.data;
};

export const getArchivedSkillsBySubject = async (subjectId) => {
  const response = await API.get(
    `/api/settings/skills/subject/${subjectId}/archived`,
  );

  return response.data;
};

export const reactivateSkill = async (skillId) => {
  const response = await API.patch(
    `/api/settings/skills/${skillId}/reactivate`,
  );

  return response.data;
};
