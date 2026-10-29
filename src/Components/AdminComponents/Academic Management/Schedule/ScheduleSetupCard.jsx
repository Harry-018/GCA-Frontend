import React from "react";

const ScheduleSetupCard = ({
  sectionName,
  buttonLabel = "Set Up Schedule",
  onClick,
}) => {
  return (
    <div className="flex w-full flex-col gap-y-8 rounded-2xl border-2 border-transparent bg-[#f4f5fc] p-5 shadow-md transition">
      <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
        {sectionName}
      </h2>

      <button
        type="button"
        onClick={() => onClick?.(sectionName)}
        className="w-fit rounded-lg items-center justify-center bg-swamp-green px-6 py-2 font-[Poppins] text-xs text-white transition hover:opacity-90 cursor-pointer"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ScheduleSetupCard;
