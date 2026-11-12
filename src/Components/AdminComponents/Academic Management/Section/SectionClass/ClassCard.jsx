import React from "react";

const ClassCard = ({ section, onDelete, onClassInformation }) => {
  return (
    <div className="group relative flex w-full flex-col gap-y-10 overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <div className="flex items-center justify-between pt-1.5">
        <h2 className="font-[PoppinsBold] text-sm text-parent-green">
          {section}
        </h2>

        <button
          type="button"
          onClick={onDelete}
          className="text-xs text-reject hover:text-egg hover:bg-reject py-1 px-2 rounded-full"
          aria-label={`Deactivate ${section}`}
        >
          Remove
        </button>
      </div>

      <div className="flex">
        <button
          type="button"
          onClick={onClassInformation}
          className="h-9 w-full whitespace-nowrap rounded-full bg-parent-green font-[Poppins] text-xs text-white hover:bg-parent-accent"
        >
          Class Information
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
