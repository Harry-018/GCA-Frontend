import React from "react";

const ContactInformation = ({
  contactNo = "+63-992-641-8081",
  emailAddress = "grace.cslife@gmail.com",
  schoolAddress = "306, Purok 4, Barangay Cabuco, Trece Martires, Philippines, 4109",
  onEdit,
}) => {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#f4f5fc] px-4 py-3 font-[Poppins] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[9px] font-[PoppinsBold] text-swamp-green sm:text-md lg:text-sm">
          Contact Information
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full bg-swamp-green px-4 py-1.5 text-[9px] sm:text-xs text-white transition hover:bg-swamp-green/80 sm:px-5 sm:py-2"
        >
          Edit
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-start gap-5 pt-5 lg:gap-10 lg:pt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="shrink-0 text-[9px] font-[PoppinsBold] text-[#555555] sm:text-sm">
            Contact No.
          </span>

          <span className="truncate text-[9px] text-[#555555] sm:text-sm">
            {contactNo}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="shrink-0 text-[9px] font-[PoppinsBold] text-[#555555] sm:text-sm">
            Email Address:
          </span>

          <span className="truncate text-[9px] text-[#555555] sm:text-sm">
            {emailAddress}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="shrink-0 text-[9px] font-[PoppinsBold] text-[#555555] sm:text-sm">
            School Address:
          </span>

          <span className="min-w-0 flex-1 wrap-break-word text-[9px] text-[#555555] sm:text-sm">
            {schoolAddress}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;