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
    <div className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-parent-accent/15 sm:p-7">
      {gradeLevels.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {gradeLevels.map((grade) => (
            <button
              key={grade.grade_level_id}
              type="button"
              onClick={() => onGradeChange(grade.grade_level_id)}
              className={`rounded-full px-4 py-2 font-[Poppins] text-xs transition ${
                activeGrade === grade.grade_level_id
                  ? "bg-parent-green text-white"
                  : "text-gray-500 hover:bg-parent-accent/15"
              }`}
            >
              {grade.grade_level_name}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-[PoppinsBold] uppercase text-parent-green sm:text-base">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onEdit} className="rounded-lg border border-parent-accent/25 px-4 py-2 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale/30">
            Edit
          </button>
          <button type="button" onClick={onRemove} className="rounded-lg bg-reject/10 px-4 py-2 text-xs font-[PoppinsBold] text-reject ring-1 ring-reject/20 transition hover:bg-reject/15">
            Remove
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        {fees.map((fee, index) => (
          <div
            key={fee.key || fee.name}
            className={`flex items-center justify-between py-3.5 ${index !== fees.length - 1 ? "border-b border-parent-accent/15" : ""}`}
          >
            <div className="min-w-0">
              <p className="font-[Poppins] text-xs text-[#555555] sm:text-sm">{fee.name}</p>
              {fee.description && <p className="text-[10px] text-[#999999] sm:text-xs">{fee.description}</p>}
            </div>
            <span className="shrink-0 font-[PoppinsBold] text-xs text-[#555555] sm:text-sm">{fee.amount}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-parent-accent/20 pt-5">
        <span className="text-xs font-[Poppins] text-[#333333] sm:text-sm">Subtotal:</span>
        <span className="text-sm font-[PoppinsBold] text-parent-green sm:text-base">{subtotal}</span>
      </div>
    </div>
  );
};

export default GradeLevelCard;
