import React from "react";

const DashboardCards = ({ cards }) => {
  const STUDENT_CARDS = cards.slice(0, 4);
  const PAYMENT_CARDS = cards.slice(4);

  const cardClass =
    "flex min-h-17 flex-col justify-between gap-2 rounded-2xl border border-gray-200 bg-[#f5f6ff] p-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:min-h-20 sm:p-4 xl:min-h-22.5";

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {STUDENT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={cardClass}>
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-1 text-2xs font-medium text-[#9caf7b] xl:text-xs">
                  {card.title}
                </p>

                <Icon
                  size={14}
                  className="shrink-0 text-[#9caf7b] xl:size-4"
                />
              </div>

              <p className="text-lg font-bold text-[#9caf7b] sm:text-xl xl:text-2xl">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PAYMENT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={cardClass}>
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-1 text-2xs font-medium text-[#9caf7b] xl:text-xs">
                  {card.title}
                </p>

                <Icon
                  size={14}
                  className="shrink-0 text-[#9caf7b] xl:size-4"
                />
              </div>

              <p className="text-lg font-bold text-[#9caf7b] sm:text-xl xl:text-2xl">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCards;