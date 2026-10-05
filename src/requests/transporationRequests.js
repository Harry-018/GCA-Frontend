import API from "../api/api.js";

// ==============================
// GET TRANSPORTATION
// ==============================

export const getTransportation = async () => {
  const response = await API.get("/api/transportation/routes");

  return response.data;
};

// ==============================
// ADD TRANSPORTATION
// ==============================

export const addTransportation = async (data) => {
  const response = await API.post("/api/transportation/routes", data);

  return response.data;
};

// ==============================
// EDIT TRANSPORTATION
// ==============================

export const editTransportation = async (transportation_id, data) => {
  const response = await API.patch(
    `/api/transportation/routes/${transportation_id}`,
    data,
  );

  return response.data;
};

// ==============================
// DELETE TRANSPORTATION
// ==============================

export const deleteTransportation = async (transportation_id) => {
  const response = await API.delete(
    `/api/transportation/routes/${transportation_id}/delete`,
  );

  return response.data;
};
