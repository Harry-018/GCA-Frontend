import React from "react";
import schoolLogo from "../../../assets/logowbg.png";

const WebsiteInformation = ({
  logo = schoolLogo,
  schoolName = "Grace Christian Academy",
  onEdit,
}) => {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-linear-to-br from-bone via-white to-parent-pale/60 px-4 py-3 font-[Poppins] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[9px] font-[PoppinsBold] text-parent-green sm:text-md lg:text-sm">
          Website Information
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full bg-parent-green px-4 py-1.5 text-[9px] sm:text-xs text-white transition hover:bg-parent-accent sm:px-5 sm:py-2"
        >
          Edit
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-6 lg:gap-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[9px] font-[PoppinsBold] text-[#555555] sm:text-sm">
            School Logo:
          </span>

          <img
            src={logo}
            alt="School Logo"
            className="h-8 w-8 object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[9px] font-[PoppinsBold] text-[#555555] sm:text-sm">
            School Name:
          </span>

          <span className="truncate text-[9px] text-[#555555] sm:text-sm">
            {schoolName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WebsiteInformation;