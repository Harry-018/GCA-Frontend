import React from "react";
import { useNavigate } from "react-router-dom";

const SectionCard = ({ level, onTabChange }) => {
  const navigate = useNavigate();
  const tabs = ["Subjects", "Sections"];

  return (
    <div className="flex w-80 flex-col gap-y-5 rounded-2xl bg-[#f4f5fc] p-5 shadow-md">
      <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
        {level}
      </h2>

      <div className="flex flex-col gap-y-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() =>
              tab === "Sections"
                ? navigate(`/admin/academic/sectionclass?level=${encodeURIComponent(level)}`)
                : onTabChange(tab)
            }
            className={`h-9 rounded-full border px-4 text-[11px] font-[Poppins] ${
              tab === "Sections"
                ? "border-swamp-green bg-swamp-green text-white"
                : "border-gray-300 bg-transparent text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionCard;