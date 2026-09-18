import React from "react";

const GradeLevelCard = ({
  name,
  onSkills,
  onRename,
  onRemove,
}) => {
  return (
    <div className="flex min-h-23.5 w-full flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-[#f8f9ff] p-4 shadow-md">
      <h3 className="font-[Poppins] text-2xs md:text-md xl:text-lg text-swamp-green">
        {name}
      </h3>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onSkills}
          className="flex-1 rounded-full bg-swamp-green px-3 py-2 font-[Poppins] text-2xs text-white"
        >
          Skills
        </button>

        <button
          type="button"
          onClick={onRename}
          className="flex-1 rounded-full border border-gray-300 px-3 py-2 font-[Poppins] text-2xs text-gray-500"
        >
          Rename
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="flex-1 rounded-full bg-[#ff7777] px-3 py-2 font-[Poppins] text-2xs text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default GradeLevelCard;