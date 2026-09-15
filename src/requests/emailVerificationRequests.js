import API from "../api/api.js";

export const sendVerification = (email) => {
  return API.post("/api/email-verification", { email, purpose: "application" });
};

export const verifyOtp = (verification_id, otp) => {
  return API.post("/api/email-verification/verify", { verification_id, otp });
};
