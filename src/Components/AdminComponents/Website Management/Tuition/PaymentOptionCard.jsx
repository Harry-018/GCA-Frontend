import React from "react";

const PaymentOptionCard = ({
  options = [],
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      {options.map((option) => (
        <div
          key={option.id}
          className="flex flex-1 flex-col rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-sm"
        >
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green sm:text-base">
              {option.name}
            </h3>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(option)}
                className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] sm:text-xs text-[#555555] transition hover:bg-white"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onRemove(option)}
                className="rounded-full bg-[#f47777] px-4 py-2 font-[Poppins] text-[9px] sm:text-xs font-medium text-white transition hover:bg-[#ed6868]"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1.5 pt-3">
            <p className="font-[Poppins] text-[9px] sm:text-xs text-[#777777]">
              Due Date:{" "}
              <span className="font-medium text-[#555555]">
                {option.dueDate || "N/A"}
              </span>
            </p>

            <p className="font-[Poppins] text-[9px] sm:text-xs text-[#777777]">
              Discount:{" "}
              <span className="font-semibold text-[#555555]">
                {option.discount || "No Discount Available"}
              </span>
            </p>

            <p className="font-[Poppins] text-[9px] sm:text-xs text-[#777777]">
              Monthly Installment:{" "}
              <span className="font-semibold text-[#555555]">
                {option.installment || "No Monthly Installment"}
              </span>
            </p>
          </div>

          {/* Total */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
            <span className="font-[Poppins] text-[9px] sm:text-xs font-medium text-[#333333]">
              Total:
            </span>

            <span className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green sm:text-base">
              {option.total}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentOptionCard;