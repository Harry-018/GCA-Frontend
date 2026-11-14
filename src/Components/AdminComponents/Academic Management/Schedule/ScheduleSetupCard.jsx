import React from "react";

const ScheduleSetupCard = ({
  sectionName,
  buttonLabel = "Set Up Schedule",
  onClick,
}) => {
  return (
    <div className="group relative flex w-full flex-col gap-y-8 overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-parent-accent/30 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <h2 className="pt-1.5 font-[PoppinsBold] text-sm text-parent-green">
        {sectionName}
      </h2>

      <button
        type="button"
        onClick={() => onClick?.(sectionName)}
        className="h-9 rounded-full border border-parent-green bg-parent-green px-4 text-[11px] font-[Poppins] text-white transition hover:bg-parent-accent hover:border-parent-accent lg:text-xs xl:text-sm"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ScheduleSetupCard;
