import API from "../api/api";

export const getInquiries = async (page = 1) => {
  const response = await API.get("/api/inquire", {
    params: { page },
  });

  return response.data;
};

export const createInquiry = async (data) => {
  const response = await API.post("/api/inquire", data);

  return response.data;
};

export const replyToInquiry = async (inquire_id, data) => {
  const response = await API.put(`/api/inquire/${inquire_id}/reply`, data);

  return response.data;
};

export const markInquiryToRead = async (inquire_id) => {
  const response = await API.patch(`/api/inquire/${inquire_id}/read`);

  return response.data;
};
