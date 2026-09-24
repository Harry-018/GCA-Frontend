import axios from "axios";
import authStore from "../stores/authStore";
import useSessionStore from "../stores/sessionStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      useSessionStore.getState().showSessionExpired();

      error.isSessionExpired = true;
    }

    return Promise.reject(error);
  },
);
export default api;
