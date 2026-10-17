import React from "react";

const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const PaymentOptionCard = ({ options = [], onEdit, onRemove }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      {options.map((option) => (
        <div
          key={option.id}
          className="flex flex-1 flex-col rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-sm"
        >
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-[Poppins] text-[9px] font-semibold text-swamp-green sm:text-base">
              {option.name}
            </h3>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(option)}
                className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] text-[#555555] transition hover:bg-white sm:text-xs"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1.5 pt-3">
            <p className="font-[Poppins] text-[9px] text-[#777777] sm:text-xs">
              Due Date:{" "}
              <span className="font-medium text-[#555555]">
                {option.dueDate || "N/A"}
              </span>
            </p>

            <p className="font-[Poppins] text-[9px] text-[#777777] sm:text-xs">
              Discount:{" "}
              <span className="font-semibold text-[#555555]">
                {formatCurrency(option.discount)}
              </span>
            </p>

            <p className="font-[Poppins] text-[9px] text-[#777777] sm:text-xs">
              Monthly Installment:{" "}
              <span className="font-semibold text-[#555555]">
                {formatCurrency(option.installment)}
              </span>
            </p>
          </div>

          {/* Total */}
          <div className="mt-4 flex flex-wrap justify-between gap-2">
            <span className="font-[Poppins] text-xs font-semibold">TOTAL:</span>

            <span className="font-[PoppinsBold] text-sm font-bold text-swamp-green">
              ₱{formatCurrency(option.totalBoys)} - ₱
              {formatCurrency(option.totalGirls)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentOptionCard;
