import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessionExpired: false,

  showSessionExpired: () => {
    console.log("SHOWING SESSION EXPIRED MODAL");

    set({ sessionExpired: true });
  },

  hideSessionExpired: () => {
    set({ sessionExpired: false });
  },
}));

export default useSessionStore;
