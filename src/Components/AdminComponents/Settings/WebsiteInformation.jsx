import React from "react";
import schoolLogo from "../../../assets/logowbg.png";

const WebsiteInformation = ({
  logo = schoolLogo,
  schoolName = "Grace Christian Academy",
  onEdit,
}) => {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#f4f5fc] px-4 py-3 font-[Poppins] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[9px] font-semibold text-[#91a875] sm:text-md lg:text-sm">
          Website Information
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full bg-[#a0b884] px-4 py-1.5 text-[9px] font-medium text-white transition hover:bg-[#91a875] sm:px-5 sm:py-2"
        >
          Edit
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-6 lg:gap-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[9px] font-[Poppins] font-semibold text-[#555555] sm:text-sm">
            School Logo:
          </span>

          <img
            src={logo}
            alt="School Logo"
            className="h-8 w-8 object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[9px] font-[Poppins] font-semibold text-[#555555] sm:text-sm">
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