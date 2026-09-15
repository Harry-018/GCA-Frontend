import React from "react";

const SectionCard = ({ sections, selectedId, onSelect, onBack }) => {
  return (
    <div className="flex w-full flex-col gap-3 p-2 sm:gap-4 sm:p-3 md:gap-5 md:p-4 lg:p-6">
      <div className="flex items-center justify-between px-1 py-1 sm:px-2 sm:py-2">
        <h2 className="text-xs font-[PoppinsBold] uppercase text-swamp-green sm:text-sm md:text-md">
          Class Sections :
        </h2>

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-gray-300 bg-slate-50 px-2.5 py-1 text-[9px] font-[PoppinsBold] uppercase text-gray-600 transition hover:bg-gray-100 sm:px-4 sm:py-2 sm:text-2xs md:px-5 md:text-xs"
        >
          Back
        </button>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-none lg:flex lg:gap-5">
        {sections.map((section) => {
          const isSelected = section.id === selectedId;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              aria-pressed={isSelected}
              className={`flex min-w-0 flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-swamp-green sm:rounded-xl sm:gap-1 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:w-70 lg:flex-none ${
                isSelected
                  ? "bg-swamp-green text-bone"
                  : "bg-bone text-gray-600"
              }`}
            >
              <span className="text-2xs font-[PoppinsBold] uppercase tracking-wide sm:text-xs md:text-sm">
                {section.name}
              </span>

              <span className="text-[9px] font-[PoppinsBold] uppercase tracking-wide sm:text-2xs md:text-xs">
                {section.level}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionCard;