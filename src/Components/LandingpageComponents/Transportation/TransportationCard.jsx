import React from "react";

const TransportationCard = ({ location, distance, price }) => {
  return (
    <div className="flex min-h-28 flex-col justify-between rounded-2xl bg-bone p-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:min-h-32 sm:p-6">
      <h3 className="font-[PoppinsBold] text-base text-swamp-green sm:text-lg">
        {location}
      </h3>

      <div className="flex items-end justify-between gap-3 border-t border-swamp-green/20 py-4">
        <p className="min-w-0 wrap-break-word text-sm text-ashlight sm:text-base">
          {distance} from school
        </p>

        <p className="shrink-0 font-[PoppinsBold] text-lg text-swamp-green sm:text-xl">
          ₱{price}
        </p>
      </div>
    </div>
  );
};

export default TransportationCard;