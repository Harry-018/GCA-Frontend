import React from "react";

const AdmissionCard = ({ Icon, Atitle }) => {
  return (
    <div className="flex w-fit items-center gap-3 rounded-xl bg-bone px-4 py-3 text-base text-egg-dark shadow-[0_2px_3px_rgba(0,0,0,0.2)] sm:px-5 sm:py-4">
      <span className="shrink-0 text-swamp-green">
        {Icon}
    </span>

      <span className="min-w-0 text-gray-500 text-sm leading-snug sm:text-base">
        {Atitle}
    </span>
    </div>
  );
};

export default AdmissionCard;