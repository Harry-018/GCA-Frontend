import React from "react";

const GradeLevelToolbar = ({
  title,
  schoolYear,
  onAdd,
  buttonText = "+ Add Subject",
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-y-2 rounded-xl py-2 font-[Poppins] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[PoppinsBold] text-sm text-swamp-green sm:text-base">
        <h2>{title} :</h2>

        {schoolYear && (
          <span className="font-[Poppins] text-sm text-gray-600 sm:text-sm">
            S.Y {schoolYear}
          </span>
        )}
      </div>

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="w-full rounded-full bg-swamp-green px-4 py-2 text-xs text-white sm:w-auto sm:text-sm"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default GradeLevelToolbar;