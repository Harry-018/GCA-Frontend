import React from "react";

const DashboardCards = ({ cards }) => {
  const STUDENT_CARDS = cards.slice(0, 4);
  const PAYMENT_CARDS = cards.slice(4);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {STUDENT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="flex min-h-22.5 items-center justify-between rounded-2xl border border-gray-200 bg-[#f5f6ff] px-4 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
            >
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-medium text-[#9caf7b] xl:text-xs">
                  {card.title}
                </p>

                <p className="text-lg font-bold text-[#9caf7b] xl:text-xl">
                  {card.value}
                </p>
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9caf7b] xl:h-10 xl:w-10">
                <Icon size={18} className="text-white" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {PAYMENT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="flex min-h-22.5 items-center justify-between rounded-2xl border border-gray-200 bg-[#f5f6ff] px-4 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
            >
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-medium text-[#9caf7b] xl:text-xs">
                  {card.title}
                </p>

                <p className="text-lg font-bold text-[#9caf7b] xl:text-xl">
                  {card.value}
                </p>
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9caf7b] xl:h-10 xl:w-10">
                <Icon size={18} className="text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCards;