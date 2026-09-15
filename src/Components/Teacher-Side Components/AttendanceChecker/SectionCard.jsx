import React from "react";

const SectionCard = ({ sections, selectedId, onSelect }) => {
  return (
    <div className="flex w-full flex-col gap-3 p-2 sm:gap-4 sm:p-3 md:gap-5 md:p-4 lg:p-6">
      <h2 className="flex items-center gap-2 text-xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-sm md:text-md">
        <span>
          Class Sections:
        </span>
      </h2>

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
                isSelected ? "bg-swamp-green text-bone" : "bg-bone text-gray-600"
              }`}
            >
              <span className="text-[10px] font-[PoppinsBold] uppercase tracking-wide sm:text-xs md:text-sm">
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
}

export default SectionCard;
