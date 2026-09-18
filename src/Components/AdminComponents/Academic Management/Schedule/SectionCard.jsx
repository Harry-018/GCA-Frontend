import React from "react";

const SectionCard = ({
  gradeLevel,
  count = 0,
  label = "Sections",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col gap-y-5 rounded-2xl border-2 border-transparent bg-[#f4f5fc] p-5 text-left shadow-md transition hover:border-swamp-green/40 hover:bg-swamp-green/15 hover:shadow-lg sm:w-80"
    >
      <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
        {gradeLevel}
      </h2>

      <div className="flex items-center justify-between">
        <span className="font-[Poppins] text-xs text-gray-600">
          {label}
        </span>

        <span className="font-[PoppinsBold] text-lg text-swamp-green">
          {count}
        </span>
      </div>
    </button>
  );
};

export default SectionCard;