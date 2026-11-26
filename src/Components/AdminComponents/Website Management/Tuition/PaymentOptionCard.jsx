import React from "react";

const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const PaymentOptionCard = ({ options = [], onEdit, onRemove }) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="rounded-2xl bg-[#0c2423] p-5 sm:p-6">
        <span className="font-[PoppinsBold] text-xs uppercase tracking-[0.25em] text-parent-mint/80">Payment Options</span>
        <h3 className="mt-2 font-[SuperJoyful] text-2xl text-parent-mint sm:text-3xl">Flexible Plans</h3>
      </div>

      {options.map((option) => (
        <div key={option.id} className="flex flex-1 flex-col rounded-2xl bg-white/10 p-5 ring-1 ring-parent-accent/15 backdrop-blur-sm" style={{backgroundColor: "#0c2423"}}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-[PoppinsBold] text-white sm:text-base">{option.name}</h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(option)}
                className="rounded-lg bg-white/10 px-4 py-2 text-xs font-[PoppinsBold] text-white ring-1 ring-white/15 transition hover:bg-white/20"
              >
                Edit
              </button>
              {onRemove && (
                <button type="button" onClick={() => onRemove(option)} className="rounded-lg bg-reject/20 px-4 py-2 text-xs font-[PoppinsBold] text-red-200 ring-1 ring-reject/30 transition hover:bg-reject/30">Remove</button>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-xs text-white/75 sm:text-sm">
            <p>Due Date: <span className="font-[PoppinsBold] text-white">{option.dueDate || "N/A"}</span></p>
            <p>Discount: <span className="font-[PoppinsBold] text-white">₱{formatCurrency(option.discount)}</span></p>
            <p>Monthly Installment: <span className="font-[PoppinsBold] text-white">₱{formatCurrency(option.installment)}</span></p>
          </div>

          <div className="mt-auto flex flex-wrap justify-between gap-2 border-t border-white/15 pt-4">
            <span className="text-xs font-[PoppinsBold] uppercase tracking-wide text-white/60">Total</span>
            <span className="text-sm font-[PoppinsBold] text-parent-mint">
              ₱{formatCurrency(option.totalBoys)} - ₱{formatCurrency(option.totalGirls)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentOptionCard;
