import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ClassCard = ({
  section,
  onEdit,
  onDelete,
  onSchedule,
  onClassInformation,
}) => {
  return (
    <div className="flex w-full flex-col gap-y-10 rounded-2xl bg-[#f4f5fc] p-5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
            {section}
          </h2>

          <button
            type="button"
            onClick={onEdit}
            className="text-gray-400 hover:text-swamp-green"
            aria-label={`Edit ${section}`}
          >
            <Pencil size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="text-red-300 hover:text-red-500"
          aria-label={`Delete ${section}`}
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* Schedule + Class Information */}
      <div className="flex gap-x-3">
        <button
          type="button"
          onClick={onSchedule}
          className="h-9 flex-1 rounded-full border border-gray-300 bg-transparent text-[11px] text-gray-500 hover:bg-gray-100"
        >
          Schedule
        </button>

        <button
          type="button"
          onClick={onClassInformation}
          className="h-9 flex-1 rounded-full bg-[#9caf7e] font-[PoppinsBold] text-[11px] text-white hover:bg-[#899d6d]"
        >
          Class Information
        </button>
      </div>
    </div>
  );
};

export default ClassCard;