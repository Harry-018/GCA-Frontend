import React from "react";

const GradeLevelToolbar = ({
  title,
  schoolYear,
  onAdd,
  buttonText = "+ Add Subject",
}) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl py-2 font-[Poppins]">
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[PoppinsBold] text-sm text-swamp-green sm:text-base">
        <h2>{title} :</h2>

        {schoolYear && (
          <span className="font-[Poppins] text-xs text-gray-600 sm:text-sm">
            S.Y {schoolYear}
          </span>
        )}
      </div>

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full bg-olive px-4 py-2 text-xs text-white bg-swamp-green"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default GradeLevelToolbar;