import React from "react";

const StepCard = ({ step, title, description, action }) => {
  const isLast = String(step) === "4";

  return (
    <div
      className={`relative flex gap-3 sm:gap-5 ${isLast ? "" : "pb-8 sm:pb-12"}`}
    >
      <div className="relative flex w-8 shrink-0 justify-center sm:w-10">
        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-parent-green to-parent-accent text-sm font-[PoppinsBold] text-white ring-4 ring-parent-pale/60 sm:h-10 sm:w-10 sm:text-base">
          {step}
        </div>
        {!isLast && (
          <span className="absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-parent-accent/60 to-parent-accent/10 sm:top-10" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h2 className="font-[PoppinsBold] uppercase text-base leading-snug text-parent-green sm:text-lg">
          {title}
        </h2>

        <p className="text-xs md:text-sm leading-relaxed text-gray-700 sm:text-base">
          {description}
        </p>

        {action && (
          <div className="flex w-full justify-center pt-2 sm:justify-end">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCard;
