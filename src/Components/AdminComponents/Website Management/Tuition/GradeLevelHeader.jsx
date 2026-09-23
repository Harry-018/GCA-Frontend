import React from "react";

const GradeLevelHeader = ({
  onAddGradeLevel,
  onAddPaymentOption,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="flex items-center justify-between">
        <h2 className="font-[Poppins] text-md font-semibold text-swamp-green">
          Grade Levels
        </h2>

        <button
          type="button"
          onClick={onAddGradeLevel}
          className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] sm:text-xs font-medium text-white transition hover:bg-lime-green"
        >
          Add Grade Level
        </button>
      </div>

      {/* Payment Options Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green">
          Payment Options
        </h2>

        <button
          type="button"
          onClick={onAddPaymentOption}
          className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] sm:text-xs font-medium text-white transition hover:bg-lime-green"
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default GradeLevelHeader;