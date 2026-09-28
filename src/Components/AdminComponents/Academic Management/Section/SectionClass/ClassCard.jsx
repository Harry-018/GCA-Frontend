import React from "react";
import { Trash2 } from "lucide-react";

const ClassCard = ({ section, onDelete, onClassInformation }) => {
  return (
    <div className="flex w-full flex-col gap-y-10 rounded-2xl bg-[#f4f5fc] p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
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
          className="h-9 w-full whitespace-nowrap rounded-full bg-[#9caf7e] font-[Poppins] text-xs text-white hover:bg-[#899d6d]"
        >
          Class Information
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
