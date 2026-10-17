import API from "../api/api.js";

export const getTuitionGradeLevels = async () => {
  const response = await API.get(`/api/tuition/grade-levels`);

  return response.data.r;
};

export const getGradeLevel = async () => {
  const response = await API.get(`/api/tuition/all-grade-levels`);

  return response.data.r;
};

export const getTuition = async (grade_level_id) => {
  const response = await API.get(`/api/tuition/${grade_level_id}`);

  return response.data.r;
};

// POST tuition
export const createGrade = async (data) => {
  const response = await API.post("/api/tuition/", data);

  return response.data;
};

// POST payment option
export const createPaymentOption = async (data) => {
  const response = await API.post(`/api/tuition/payment-option`, data);

  return response.data;
};

// PATCH fees
export const patchFees = async (feesId, data) => {
  const response = await API.patch(`/api/tuition/fees/${feesId}`, data);

  return response.data;
};

// PATCH payment option
export const patchPaymentOption = async (paymentOptionId, data) => {
  const response = await API.patch(
    `/api/tuition/payment-option/${paymentOptionId}`,
    data,
  );

  return response.data;
};

// PATCH grade/payment-option relationship
export const patchGradePaymentOption = async (
  gradelevelPaymentoptionId,
  data,
) => {
  const response = await API.patch(
    `/api/tuition/grade-payment-option/${gradelevelPaymentoptionId}`,
    data,
  );

  return response.data;
};

export const deleteGrade = async (grade_level_id) => {
  const response = await API.delete(`/api/tuition/grade/${grade_level_id}`);

  return response.data;
};
