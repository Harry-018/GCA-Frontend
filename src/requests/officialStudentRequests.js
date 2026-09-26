import API from "../api/api";

export const getOfficialStudents = async ({
  status = "all",
  search = "",
  page = 1,
  limit = 10,
}) => {
  const response = await API.get("/api/official-students", {
    params: {
      status,
      search,
      page,
      limit,
    },
  });

  return response.data;
};

export const getOfficialStudentInfo = async (stu_id) => {
  const response = await API.get(`/api/official-students/${stu_id}`);

  return response.data.data;
};

export const getOfficialStudentEnrollments = async (stu_id) => {
  const response = await API.get(
    `/api/official-students/${stu_id}/enrollments`,
  );

  return response.data.data;
};

export const editOfficialStudent = async (stu_id, data) => {
  const response = await API.patch(`/api/official-students/${stu_id}`, data);

  return response.data;
};

export const getParents = async ({ search = "", page = 1, limit = 10 }) => {
  const response = await API.get("/api/parents", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
};
