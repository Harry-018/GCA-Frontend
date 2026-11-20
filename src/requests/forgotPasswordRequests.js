import API from "../api/api.js";

// SEND OTP
export const sendPasswordResetCode = async (email) => {
  const response = await API.post("/api/forgot-password/send-code", {
    email,
  });

  return response.data;
};

// VERIFY OTP
export const verifyPasswordResetCode = async (verification_id, otp) => {
  const response = await API.post("/api/forgot-password/verify-code", {
    verification_id,
    otp,
  });

  return response.data;
};

// RESET PASSWORD
export const resetPassword = async (verification_id, reset_token, password) => {
  const response = await API.post("/api/forgot-password/reset-password", {
    verification_id,
    reset_token,
    password,
  });

  return response.data;
};
