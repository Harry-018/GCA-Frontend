import React from "react";

const SectionCard = ({
  gradeLevel,
  count = 0,
  label = "Sections",
  onClick,
  onRemove,
}) => {
  return (
    <div className="relative w-full sm:w-80">
      <button
        type="button"
        onClick={onClick}
        className="group relative flex w-full flex-col gap-y-5 overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-parent-accent/40 hover:shadow-lg"
      >
        <span className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

        <h2 className="pt-1.5 font-[PoppinsBold] text-sm text-parent-green">
          {gradeLevel}
        </h2>

        <div className="flex items-center justify-between">
          <span className="font-[Poppins] text-xs text-gray-600">{label}</span>

          <span className="font-[PoppinsBold] text-lg text-parent-green">
            {count}
          </span>
        </div>
      </button>

      {onRemove && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="absolute right-3 top-3 text-[12px] lg:text-xs xl:text-sm text-reject hover:text-egg hover:bg-reject py-1 px-2 rounded-full"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default SectionCard;
