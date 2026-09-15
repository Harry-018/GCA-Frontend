import API from "../../api/api";

export const getPaymentOptionsInGradeLevel = async (gradeLevelId) => {
  return API.get(`/api/payments/payment-gradelevel/${gradeLevelId}`);
};
