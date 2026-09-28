import API from "../api/api";

export const getUserAccounts = async ({
  status = "all",
  role = "all",
  search = "",
  page = 1,
  limit = 10,
}) => {
  const response = await API.get("/api/user-accounts", {
    params: {
      status,
      role,
      search,
      page,
      limit,
    },
  });

  return response.data;
};

export const inviteUserAccount = async (user_id) => {
  const response = await API.post("/api/user-accounts/invite", {
    user_id,
  });

  return response.data;
};

export const disableUserAccount = async (user_id) => {
  const response = await API.patch(`/api/user-accounts/${user_id}/disable`);

  return response.data;
};

export const reactivateUserAccount = async (user_id) => {
  const response = await API.patch(`/api/user-accounts/${user_id}/reactivate`);

  return response.data;
};
