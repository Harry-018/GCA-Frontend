import React from "react";
import { useNavigate } from "react-router-dom";

const SectionCard = ({ level, syGradeLevelId, sectionCount }) => {
  const navigate = useNavigate();

  const handleSections = () => {
    navigate(
      `/admin/academic/sectionclass?level=${encodeURIComponent(
        level,
      )}&sy_grade_level_id=${syGradeLevelId}`,
    );
  };

  return (
    <div className="flex w-full flex-col gap-y-5 rounded-2xl bg-[#f4f5fc] p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">{level}</h2>

        <span className="text-xs text-gray-500">
          {sectionCount} section{sectionCount !== 1 ? "s" : ""}
        </span>
      </div>

      <button
        type="button"
        onClick={handleSections}
        className="h-9 rounded-full border border-swamp-green bg-swamp-green px-4 text-[11px] font-[Poppins] text-white"
      >
        Sections
      </button>
    </div>
  );
};

export default SectionCard;
