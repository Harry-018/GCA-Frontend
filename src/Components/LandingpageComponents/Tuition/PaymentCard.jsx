import React from "react";

const PaymentCard = ({ title, discount, total, installment, dueDate }) => {
  return (
    <div className="relative flex min-h-55 flex-col overflow-hidden rounded-2xl border border-parent-accent/20 bg-bone p-4 font-[Poppins] shadow-sm sm:min-h-60 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-parent-green via-parent-accent to-lime-green" />

      <div className="flex flex-col gap-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-[PoppinsBold] text-sm text-parent-green sm:text-base">
            {title}
          </h3>
          <span className="rounded-full bg-parent-pale px-3 py-1 text-2xs font-[PoppinsBold] text-parent-green">
            Payment plan
          </span>
        </div>

        <div className="rounded-xl bg-parent-pale/60 px-4 py-3">
          <span className="text-2xs text-neutral-500">Total</span>
          <p className="mt-1 font-[PoppinsBold] text-base text-parent-green sm:text-lg">
            {total}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-y-1">
            <span className="text-2xs text-neutral-500">Discount</span>
            <span className="font-[PoppinsBold] text-xs wrap-break-word text-parent-accent">
              {discount}
            </span>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-2xs text-neutral-500">
              Monthly Installment
            </span>
            <span className="font-[PoppinsBold] text-xs wrap-break-word text-parent-green">
              {installment}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-y-1 border-t border-parent-accent/15 pt-3">
        <span className="text-2xs text-neutral-500">Due Date</span>
        <span className="font-[PoppinsBold] text-2xs wrap-break-word text-parent-green">
          {dueDate}
        </span>
      </div>
    </div>
  );
};

export default PaymentCard;
