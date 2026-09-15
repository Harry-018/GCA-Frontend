import React from "react";

const PaymentCard = ({
  title,
  discount,
  total,
  installment,
  dueDate,
}) => {

  return (
    <div className="flex min-h-37 flex-col justify-between rounded-2xl bg-linear-to-r from-[#0c2423] to-[#479257] px-4 py-4 font-[Poppins] text-bone shadow-md sm:px-5">
      <h3 className="font-[PoppinsBold] text-xs sm:text-sm">
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-0">
        <div className="flex flex-col gap-y-1">
          <span className="text-2xs opacity-70">
            Total
          </span>

          <span className="font-[PoppinsBold] text-sm sm:text-base">
            {total}
          </span>
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1">
            <span className="text-2xs opacity-70">
              Discount
            </span>

            <span className="font-[PoppinsBold] text-xs wrap-break-word">
              {discount}
            </span>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-2xs opacity-70">
              Monthly Installment
            </span>

            <span className="font-[PoppinsBold] text-xs wrap-break-word">
              {installment}
            </span>
          </div>
        </div>
      </div>

      <div className="flex -translate-y-1 flex-col gap-y-1">
        <span className="text-2xs opacity-70">
          Due Date
        </span>

        <span className="font-[PoppinsBold] text-2xs wrap-break-word">
          {dueDate}
        </span>
      </div>
    </div>
  );
};

export default PaymentCard;