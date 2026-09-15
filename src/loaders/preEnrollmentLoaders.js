import API from "../api/api.js";

export const getGradeLevels = async () => {
  try {
    const gradeLevels = await API.get("/api/academics/grade-level");

    console.log("GRADE LEVEL AXIOS RESPONSE:", gradeLevels);
    console.log("GRADE LEVEL RESPONSE DATA:", gradeLevels.data.data);

    return gradeLevels.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Backend Database Error Data:", error.response.data);
    }

    throw error;
  }
};
