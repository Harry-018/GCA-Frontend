import API from "../api/api";

export const getSchoolYears = async ({
  status = "all",
  search = "",
  page = 1,
  limit = 10,
} = {}) => {
  const response = await API.get("/api/academics/school-year", {
    params: {
      status,
      search,
      page,
      limit,
    },
  });

  return response.data;
};

export const addSchoolYear = async (data) => {
  const response = await API.post("/api/academics/school-year", data);

  return response.data;
};

export const editSchoolYear = async (school_year_id, data) => {
  const response = await API.patch(
    `/api/academics/school-year/${school_year_id}`,
    data,
  );

  return response.data;
};

export const getGradeLevels = async () => {
  const response = await API.get("/api/academics/grade-level");

  return response.data.data;
};

export const getGradeLevelBySchoolYearGradeLevel = async (
  sy_grade_level_id,
) => {
  const response = await API.get(
    `/api/academics/schoolyear-gradelevel/${sy_grade_level_id}`,
  );

  return response.data.data;
};

export const getAvailableGradeLevels = async () => {
  const response = await API.get("/api/academics/gradelevel-schoolyear");

  return response.data.data;
};

export const addGradeLevelToSchoolYear = async (grade_level_id) => {
  const response = await API.post("/api/academics/gradelevel-schoolyear", {
    grade_level_id,
  });

  return response.data.data;
};

export const removeGradeLevelFromSchoolYear = async (grade_level_id) => {
  const response = await API.patch("/api/academics/gradelevel-schoolyear", {
    grade_level_id,
  });

  return response.data.data;
};

export const getSubjects = async () => {
  const response = await API.get("/api/academics/subjects");

  return response.data.data;
};

export const getSubjectsByGradeLevel = async (sy_grade_level_id) => {
  const response = await API.get(
    `/api/academics/grade-level/${sy_grade_level_id}/subjects/available`,
  );

  return response.data.data;
};

export const getSubjectsInGradeLevel = async (sy_grade_level_id) => {
  const response = await API.get(
    `/api/academics/grade-level/${sy_grade_level_id}/subjects`,
  );

  return response.data.data;
};

export const addSubjectsToGradeLevel = async (data) => {
  const response = await API.post("/api/academics/grade-level/subjects", data);

  return response.data.data;
};

export const removeSubjectFromGradeLevel = async (sy_gradelevel_subject_id) => {
  const response = await API.patch(
    `/api/academics/grade-level/subjects/${sy_gradelevel_subject_id}`,
  );

  return response.data.data;
};

// skills
export const getSkillsBySubject = async (subject_id) => {
  const response = await API.get(`/api/academics/subject/${subject_id}/skills`);
  return response.data.data;
};

export const getSkillsByGradeLevelSubject = async (
  sy_gradelevel_subject_id,
) => {
  const response = await API.get(
    `/api/academics/grade-level-subject/${sy_gradelevel_subject_id}/skills`,
  );
  return response.data.data;
};

export const getAvailableSkillsByGradeLevelSubject = async (
  sy_gradelevel_subject_id,
) => {
  const response = await API.get(
    `/api/academics/grade-level-subject/${sy_gradelevel_subject_id}/skills/available`,
  );

  return response.data.data;
};

export const addSkillToSubject = async (subject_id, data) => {
  const response = await API.post(
    `/api/academics/subject/${subject_id}/skills`,
    data,
  );
  return response.data.data;
};

export const assignSkillsToGradeLevelSubject = async (
  sy_gradelevel_subject_id,
  skill_ids,
) => {
  const response = await API.post(
    `/api/academics/grade-level-subject/${sy_gradelevel_subject_id}/skills`,
    {
      skill_ids,
    },
  );

  return response.data.data;
};

export const editSkill = async (subject_id, skill_id, data) => {
  const response = await API.patch(
    `/api/academics/subject/${subject_id}/skills/${skill_id}`,
    data,
  );
  return response.data.data;
};

export const archiveSkill = async (sy_gradelevel_subject_id, skill_id) => {
  const response = await API.patch(
    `/api/academics/grade-level-subject/${sy_gradelevel_subject_id}/skills/${skill_id}/archive`,
  );
  return response.data.data;
};

export const restoreSkill = async (sy_gradelevel_subject_id, skill_id) => {
  const response = await API.patch(
    `/api/academics/grade-level-subject/${sy_gradelevel_subject_id}/skills/${skill_id}/restore`,
  );
  return response.data.data;
};
