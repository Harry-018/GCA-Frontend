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
      className="flex w-full min-w-0 flex-col gap-y-4 rounded-2xl border-2 border-transparent bg-[#f4f5fc] p-4 text-left shadow-md transition hover:border-swamp-green/40 hover:bg-swamp-green/15 hover:shadow-lg sm:w-80 sm:gap-y-5"
    >
      <h2 className="truncate font-[PoppinsBold] text-sm text-swamp-green sm:text-base">
        {title}
      </h2>

      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-[Poppins] text-xs text-gray-600 sm:text-sm">
          {label}
        </span>

        <span className="shrink-0 font-[PoppinsBold] text-lg text-swamp-green sm:text-base">
          {count}
        </span>
      </div>
    </button>
  );
};

export default YearCard;