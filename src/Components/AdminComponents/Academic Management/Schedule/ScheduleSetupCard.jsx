import React from "react";

const ScheduleSetupCard = ({
  sectionName,
  buttonLabel = "Set Up Schedule",
  onClick,
}) => {
  return (
    <div className="group relative flex w-full flex-col gap-y-8 overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-parent-accent/30 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <h2 className="pt-1.5 font-[PoppinsBold] text-sm text-parent-green">
        {sectionName}
      </h2>

      <button
        type="button"
        onClick={() => onClick?.(sectionName)}
        className="w-fit rounded-lg items-center justify-center bg-parent-green px-6 py-2 font-[Poppins] text-xs text-white transition hover:opacity-90 cursor-pointer"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ScheduleSetupCard;
