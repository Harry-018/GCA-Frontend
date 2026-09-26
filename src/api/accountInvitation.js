import API from "./api.js";

export const verifyAccountInvitation = async (token) => {
  const response = await API.get(`/api/account-invitations/verify/${token}`);

  return response.data;
};

export const activateAccount = async (activation_token, password) => {
  const response = await API.post("/api/account-invitations/activate", {
    activation_token,
    password,
  });

  return response.data;
};
