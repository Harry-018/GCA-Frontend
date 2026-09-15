import { create } from "zustand";
import { persist } from "zustand/middleware";
const authStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: (token, user) => {
        set({
          token,
          user,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
        });
      },
    }),
    { name: "authLocalStorage" },
  ),
);

export default authStore;
