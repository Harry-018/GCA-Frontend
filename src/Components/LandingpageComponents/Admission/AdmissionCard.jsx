import React from "react";

const AdmissionCard = ({ Icon, Atitle }) => {
  return (
    <div className="flex w-fit items-center gap-3 rounded-xl border border-parent-accent/15 bg-bone px-4 py-3 text-base text-egg-dark sm:px-5 sm:py-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-parent-green/10 text-parent-green ring-1 ring-parent-green/15 sm:h-9 sm:w-9">
        {Icon}
      </span>

      <span className="min-w-0 text-sm leading-snug text-gray-600 sm:text-base">
        {Atitle}
      </span>
    </div>
  );
};

export default AdmissionCard;