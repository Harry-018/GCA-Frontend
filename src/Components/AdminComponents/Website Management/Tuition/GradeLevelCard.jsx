import React from "react";

const GradeLevelCard = ({
  title,
  gradeLevels = [],
  activeGrade,
  onGradeChange,
  fees = [],
  subtotal,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {gradeLevels.map((grade) => (
          <button
            key={grade.grade_level_id}
            type="button"
            onClick={() => onGradeChange(grade.grade_level_id)}
            className={`rounded-full px-4 py-2 font-[Poppins] text-[9px] sm:text-xs transition ${
              activeGrade === grade.grade_level_id
                ? "bg-swamp-green text-white"
                : "text-[#555555] hover:bg-swamp-green/20"
            }`}
          >
            {grade.grade_level_name}
          </button>
        ))}
      </div>

      {/* Grade Level Card */}
      <div className="flex flex-1 flex-col rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-4 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className=" text-[9px] sm:text-sm font-[PoppinsBold] uppercase text-swamp-green">
            {title}
          </h3>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onEdit}
              className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] sm:text-xs text-[#555555] transition hover:bg-bone"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="rounded-full bg-reject px-4 py-2 font-[Poppins] text-[9px] sm:text-xs text-white transition hover:bg-reject/80"
            >
              Remove
            </button>
          </div>
        </div>

        {/* Fees */}
        <div className="flex flex-1 flex-col pt-3">
          {fees.map((fee, index) => (
            <div
              key={fee.key || fee.name}
              className={`flex items-center justify-between py-3.5 ${
                index !== fees.length - 1
                  ? "border-b border-[#dddddd]"
                  : "border-b border-[#aaaaaa]"
              }`}
            >
              <div className="min-w-0">
                <p className="font-[Poppins] text-[9px] text-[#555555] sm:text-sm">
                  {fee.name}
                </p>

                {fee.description && (
                  <p className="font-[Poppins] text-[9px] sm:text-2xs text-[#999999] sm:text-xs">
                    {fee.description}
                  </p>
                )}
              </div>

              <span className="shrink-0 font-[Poppins] text-[9px] text-[#555555] sm:text-sm">
                {fee.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-7">
          <span className="font-[Poppins] text-[9px] text-[#333333] sm:text-sm">
            Subtotal:
          </span>

          <span className=" text-[9px] font-[PoppinsBold] text-swamp-green sm:text-base">
            {subtotal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GradeLevelCard;
