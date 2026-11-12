import React from "react";

const YearCard = ({
  title,
  count = 0,
  label = "Current Announcement",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full min-w-0 flex-col gap-y-4 overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-4 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-parent-accent/40 hover:shadow-lg sm:w-80 sm:gap-y-5"
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <h2 className="truncate pt-1.5 font-[PoppinsBold] text-sm text-parent-green sm:text-base">
        {title}
      </h2>

      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-[Poppins] text-xs text-gray-600 sm:text-sm">
          {label}
        </span>

        <span className="shrink-0 font-[PoppinsBold] text-lg text-parent-green sm:text-base">
          {count}
        </span>
      </div>
    </button>
  );
};

export default YearCard;
