import React from "react";
import schoolLogo from "../../../assets/logowbg.png";

const WebsiteInformation = ({
  logo = schoolLogo,
  schoolName = "Grace Christian Academy",
  onEdit,
}) => {
  return (
    <section className="shrink-0 overflow-hidden rounded-2xl bg-[#0c2423] p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="font-[PoppinsBold] text-xs uppercase tracking-[0.2em] text-parent-mint/80 sm:text-xs sm:tracking-[0.25em]">
            Website Information
          </span>
          <h2 className="mt-3 max-w-md wrap-break-words font-[SuperJoyful] text-2xl leading-tight text-parent-mint xs:text-3xl sm:text-4xl">
            School Identity
          </h2>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 rounded-xl bg-white/15 px-4 py-2 text-xs font-[PoppinsBold] text-white ring-1 ring-white/20 transition hover:bg-white/25"
        >
          Edit
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/90 p-2">
            <img src={logo} alt="School Logo" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-white/50">School Logo</p>
            <p className="mt-1 text-sm text-bone/85">Displayed across the website and portal</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
          <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-white/50">School Name</p>
          <p className="mt-1 font-[PoppinsBold] text-base text-white sm:text-lg">{schoolName}</p>
        </div>
      </div>
    </section>
  );
};

export default WebsiteInformation;