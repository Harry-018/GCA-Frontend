import React from "react";
import { Mail } from "lucide-react";
import { NavLink } from "react-router-dom";

const ApplyingModal = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8 font-[Poppins] sm:px-5">
      <div className="flex w-full max-w-sm flex-col items-center gap-y-5 rounded-2xl bg-[#f3f5ff] px-6 py-10 shadow-md sm:max-w-3xl sm:gap-y-7 sm:px-8 sm:py-14 md:max-w-5xl md:px-16 md:py-20">
        {/* Icon */}
        <Mail
          size={44}
          strokeWidth={1.8}
          className="text-swamp-green sm:h-15 sm:w-15 md:h-20 md:w-20"
        />

        {/* Message */}
        <div className="flex w-full flex-col items-center gap-y-3 text-center sm:gap-y-4">
          <h1 className="text-lg leading-snug text-neutral-700 sm:text-2xl md:text-3xl">
            Thank you for applying!
          </h1>

          <p className="w-full max-w-sm text-2xs leading-5 text-neutral-600 sm:max-w-lg sm:text-base sm:leading-6 md:max-w-xl md:leading-7">
            Please wait 3–4 working days to receive the result of your
            application. The update will be sent to the email you have provided.
          </p>
        </div>

        {/* Button */}
        <NavLink
          to="/"
          className="flex w-full justify-center rounded-xl bg-swamp-green px-5 py-2.5 text-xs font-[PoppinsBold] text-bone transition hover:opacity-90 sm:w-32 md:w-36"
        >
          Home Page
        </NavLink>
      </div>
    </div>
  );
};

export default ApplyingModal;
