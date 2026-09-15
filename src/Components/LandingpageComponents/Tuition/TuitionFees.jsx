import React from "react";
import PaymentCard from "./PaymentCard";

const TuitionFees = ({
  tuitionData,
  activeLevel,
  onActiveLevelChange,
  data,
  paymentOptions,
}) => {
  return (
    <div className="flex w-full flex-col gap-y-5 font-[Poppins] sm:gap-y-6">
      <div className="flex w-full flex-wrap items-center justify-center gap-4 rounded-2xl bg-bone p-1.5 shadow-sm sm:w-fit sm:gap-2 sm:p-2">
        {Object.keys(tuitionData).map((level) => (
        <button
        key={level}
        type="button"
        onClick={() => onActiveLevelChange(level)}
        aria-pressed={activeLevel === level}
        className={`rounded-xl px-3 py-2 text-xs font-Handpicked-seashells font-bold transition-colors sm:px-5 sm:text-center sm:text-sm ${
        activeLevel === level
          ? "bg-swamp-green text-bone shadow-sm"
          : "text-neutral-600 hover:bg-swamp-lite"
        }`}
    >
      {level}
    </button>
  ))}
</div>

      {/* Main Content */}
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-y-5 rounded-2xl bg-[#f3f5ff] p-4 shadow-md sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-2xs font-[PoppinsBold] uppercase tracking-[0.18em] text-ashlight">Fee breakdown</p>
              <h2 className="font-[PoppinsBold] text-sm uppercase text-swamp-green sm:text-base">
                {activeLevel}
              </h2>
            </div>
            <span className="rounded-full bg-swamp-lite px-3 py-1 text-2xs font-[PoppinsBold] uppercase tracking-wide text-lime-dark">2026 - 2027</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-neutral-400 pb-3">
            <div className="flex flex-col gap-y-1">
              <span className="font-[PoppinsBold] text-sm text-swamp-green">
                Tuition Fee
              </span>

              <span className="text-2xs text-neutral-500 sm:text-xs">
                One-time / per semester
              </span>
            </div>

            <span className="font-[PoppinsBold] text-sm text-swamp-green sm:text-base">
              {data.tuition}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between border-b border-neutral-200 py-3 text-xs text-neutral-600">
              <span>Books</span>
              <span className="font-[PoppinsBold]">
                {data.books}
              </span>
            </div>

            <div className="flex justify-between border-b border-neutral-200 py-3 text-xs text-neutral-600">
              <span>Uniform (Boys)</span>
              <span className="font-[PoppinsBold]">
                {data.boysUniform}
              </span>
            </div>

            <div className="flex justify-between border-b border-neutral-200 py-3 text-xs text-neutral-600">
              <span>P.E. Uniform (Boys)</span>
              <span className="font-[PoppinsBold]">
                {data.boysPE}
              </span>
            </div>

            <div className="flex justify-between border-b border-neutral-200 py-3 text-xs text-neutral-600">
              <span>Uniform (Girls)</span>
              <span className="font-[PoppinsBold]">
                {data.girlsUniform}
              </span>
            </div>

            <div className="flex justify-between py-3 text-xs text-neutral-600">
              <span>P.E. Uniform (Girls)</span>
              <span className="font-[PoppinsBold]">
                {data.girlsPE}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-400 pt-5">
            <span className="text-xs text-neutral-600">
              Subtotal
            </span>

            <span className="font-[PoppinsBold] text-base text-swamp-green sm:text-lg">
              {data.subtotal}
            </span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-1 text-2xs font-[PoppinsBold] uppercase tracking-[0.18em] text-ashlight">Choose a plan</p>
            <h2 className="text-start font-Handpicked-seashells text-base font-bold text-swamp-green sm:text-lg">
              PAYMENT OPTIONS
            </h2>
          </div>

          <div className="flex flex-col gap-y-2">
            {paymentOptions.map((option) => (
              <PaymentCard
                key={option.title}
                title={option.title}
                discount={option.discount}
                total={option.total}
                installment={option.installment}
                dueDate={option.dueDate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionFees;