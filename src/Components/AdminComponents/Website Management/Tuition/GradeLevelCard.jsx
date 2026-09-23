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
            key={grade}
            type="button"
            onClick={() => onGradeChange(grade)}
            className={`rounded-full px-4 py-2 font-[Poppins] text-[9px] sm:text-xs transition ${
              activeGrade === grade
                ? "bg-[#a8ba88] font-medium text-white"
                : "text-[#555555] hover:bg-[#a8ba88]/20"
            }`}
          >
            {grade}
          </button>
        ))}
      </div>

      {/* Grade Level Card */}
      <div className="flex flex-1 flex-col rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-4 shadow-sm sm:p-7">
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-[Poppins] text-[9px] sm:text-sm font-semibold uppercase text-swamp-green">
            {title}
          </h3>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onEdit}
              className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] sm:text-xs text-[#555555] transition hover:bg-white"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="rounded-full bg-[#f47777] px-4 py-2 font-[Poppins] text-[9px] sm:text-xs font-medium text-white transition hover:bg-[#ed6868]"
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
                <p className="font-[Poppins] text-[9px] sm:text-xs text-[#555555] sm:text-sm">
                  {fee.name}
                </p>

                {fee.description && (
                  <p className="font-[Poppins] text-[9px] sm:text-2xs text-[#999999] sm:text-xs">
                    {fee.description}
                  </p>
                )}
              </div>

              <span className="shrink-0 font-[Poppins] text-[9px] sm:text-xs text-[#555555] sm:text-sm">
                {fee.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-7">
          <span className="font-[Poppins] text-[9px] sm:text-xs font-medium text-[#333333] sm:text-sm">
            Subtotal:
          </span>

          <span className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green sm:text-base">
            {subtotal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GradeLevelCard;