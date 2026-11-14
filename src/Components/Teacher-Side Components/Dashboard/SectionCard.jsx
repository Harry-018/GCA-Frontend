import React from "react";

const SectionCard = ({
  sections = [],
  selectedId,
  onSelect,
  schoolYear = "",
}) => {
  return (
    <section className="flex w-full min-w-0 flex-col gap-3">
      <h2 className="flex flex-wrap items-center gap-2 text-xs font-[PoppinsBold] uppercase tracking-wide text-parent-green sm:text-sm">
        <span>Class Sections:</span>
        <span className="text-gray-600">S.Y. {schoolYear || "Loading..."}</span>
      </h2>

      {sections.length === 0 ? (
        <p className="rounded-xl bg-bone px-4 py-5 text-sm text-gray-500">
          No adviser sections available.
        </p>
      ) : (
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:flex lg:flex-wrap">
          {sections.map((section) => {
            const isSelected = String(section.id) === String(selectedId);

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelect(section.id)}
                aria-pressed={isSelected}
                className={`group relative flex min-w-0 cursor-pointer flex-col items-start gap-1 overflow-hidden rounded-xl border px-3 py-3 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-parent-green focus-visible:ring-offset-2 sm:px-4 ${
                  isSelected
                    ? "border-parent-green bg-parent-green text-bone shadow-md"
                    : "border-parent-accent/15 bg-bone text-gray-600 hover:-translate-y-0.5 hover:border-parent-accent/40 hover:bg-parent-green/5 hover:shadow-md"
                } lg:w-64 lg:flex-none`}
              >
                <span className="text-xs font-[PoppinsBold] uppercase tracking-wide sm:text-sm">
                  {section.name}
                </span>
                <span className="text-[10px] font-[PoppinsBold] uppercase tracking-wide sm:text-xs">
                  {section.level}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SectionCard;
