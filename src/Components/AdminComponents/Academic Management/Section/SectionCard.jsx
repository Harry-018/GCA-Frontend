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
    <div className="group relative flex min-h-30 w-full flex-col justify-between gap-y-5 overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <div className="flex items-center justify-between pt-1.5">
        <h2 className="font-[PoppinsBold] text-sm text-parent-green">{level}</h2>

        <span className="rounded-full bg-parent-pale px-2.5 py-1 text-xs font-[PoppinsBold] text-parent-green">
          {sectionCount} section{sectionCount !== 1 ? "s" : ""}
        </span>
      </div>

      <button
        type="button"
        onClick={handleSections}
        className="h-9 rounded-full border border-parent-green bg-parent-green px-4 text-[11px] font-[Poppins] text-white transition hover:bg-parent-accent hover:border-parent-accent lg:text-xs xl:text-sm"
      >
        Sections
      </button>
    </div>
  );
};

export default SectionCard;
