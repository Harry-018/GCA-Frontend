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
