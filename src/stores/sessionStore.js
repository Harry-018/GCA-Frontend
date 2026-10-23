import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessionExpired: false,

  showSessionExpired: () => {
    set({ sessionExpired: true });
  },

  hideSessionExpired: () => {
    set({ sessionExpired: false });
  },
}));

export default useSessionStore;
