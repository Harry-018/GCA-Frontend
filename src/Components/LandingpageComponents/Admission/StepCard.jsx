import React from "react";

const StepCard = ({ step, title, description, action }) => {
  return (
    <div className={`flex flex-col ${step !== "4" ? "gap-3 py-3 sm:gap-5" : "gap-4 sm:gap-8"}`}>
      <div className="flex gap-3 sm:gap-5">
        <div className="relative flex w-8 shrink-0 justify-center sm:w-10">
          <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-swamp-green text-sm font-[PoppinsBold] text-white sm:h-10 sm:w-10 sm:text-base">
            {step}
          </div>
          {step !== "4" && (
            <span className="absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2 bg-swamp-green sm:top-10" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 sm:gap-10">
          <div className="flex min-w-0 flex-col gap-2">
            <h2 className="font-[PoppinsBold] uppercase text-base leading-snug text-swamp-green sm:text-lg">
              {title}
            </h2>

            <p className="text-xs md:text-sm leading-relaxed text-gray-700 sm:text-base">{description}</p>
          </div>
        </div>
      </div>
      {action && <div className="flex w-full justify-center sm:justify-end">{action}</div>}
    </div>
  );
};

export default StepCard;