import React from "react";

const PaymentCard = ({ title, discount, total, installment, dueDate }) => {
  return (
    <div className="relative flex min-h-37 flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br from-forest-green via-parent-green to-parent-accent px-4 py-4 font-[Poppins] text-bone shadow-[0_6px_16px_rgba(19,50,21,0.22)] sm:px-5">
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-parent-mint/20 blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-parent-mint via-lime-green to-transparent" />

      <h3 className="relative font-[PoppinsBold] text-xs sm:text-sm">
        {title}
      </h3>

      <div className="relative grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-0">
        <div className="flex flex-col gap-y-1">
          <span className="text-2xs text-parent-mint/80">Total</span>

          <span className="font-[PoppinsBold] text-sm text-white sm:text-base">
            {total}
          </span>
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1">
            <span className="text-2xs text-parent-mint/80">Discount</span>

            <span className="font-[PoppinsBold] text-xs wrap-break-word text-parent-mint">
              {discount}
            </span>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-2xs text-parent-mint/80">
              Monthly Installment
            </span>

            <span className="font-[PoppinsBold] text-xs wrap-break-word">
              {installment}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-3 flex flex-col gap-y-1 border-t border-bone/15 pt-3">
        <span className="text-2xs text-parent-mint/80">Due Date</span>

        <span className="font-[PoppinsBold] text-2xs wrap-break-word text-bone/90">
          {dueDate}
        </span>
      </div>
    </div>
  );
};

export default PaymentCard;
