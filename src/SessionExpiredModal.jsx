import React from "react";
import { LogIn } from "lucide-react";
import useSessionStore from "./stores/sessionStore";

const SessionExpiredModal = () => {
  const sessionExpired = useSessionStore((state) => state.sessionExpired);

  if (!sessionExpired) return null;

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 px-4 font-[Poppins]">
      <div className="w-full max-w-105 rounded-[20px] border border-[#2d2d2d]/20 bg-[#f3f3f1] px-6 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-swamp-green/10">
            <LogIn size={22} className="text-swamp-green" />
          </div>

          <h2 className="text-[17px] font-[PoppinsBold] text-[#2d2d2d]">
            Session Expired
          </h2>

          <p className="mt-3 text-xs leading-6 text-gray-600">
            Your session has expired. Please log in again to continue using the
            system.
          </p>

          <button
            type="button"
            onClick={handleLogin}
            className="mt-6 min-w-32 rounded-full bg-swamp-green px-5 py-2.5 text-xs font-[Poppins] text-white transition hover:opacity-90"
          >
            Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
