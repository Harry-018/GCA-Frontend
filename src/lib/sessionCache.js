import authStore from "../stores/authStore.js";
import { queryClient } from "./queryClient.js";

/**
 * Identity of the current authenticated session.
 *
 * Uses the user id/email when available and falls back to the token (which is
 * unique per login), so a logout, expiry or switch to another user is detected
 * without depending on one exact shape of the backend user object.
 */
export const getSessionIdentity = (token, user) => {
  if (!token || !user) return null;

  return String(user.user_id ?? user.id ?? user.email ?? user.role ?? token);
};

/**
 * Drop every cached query/mutation after cancelling in-flight requests.
 *
 * Call this only when no protected query observers are mounted (for example
 * from an effect after the logout navigation committed). Clearing while a
 * protected page is still mounted makes its observers rebuild empty queries
 * and refetch without a token, which loops into the 401 session modal.
 */
export const clearSessionQueries = () => {
  queryClient.cancelQueries();
  queryClient.clear();
};

/** End the current session. Cache cleanup is handled by SessionCacheGuard. */
export const endSession = () => {
  authStore.getState().logout();
};
