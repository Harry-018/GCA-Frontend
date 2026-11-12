import React from "react";

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="group relative flex min-h-17 flex-col justify-between gap-2 overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:min-h-20 sm:p-4 xl:min-h-22.5">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

    <div className="flex items-start justify-between gap-2 pt-1.5">
      <p className="line-clamp-1 text-2xs text-parent-green xl:text-xs">
        {title}
      </p>

      <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-parent-green text-parent-mint shadow-sm ring-1 ring-parent-accent/20 transition-transform duration-300 group-hover:scale-110 xl:size-8">
        <Icon size={14} className="xl:size-4" />
      </span>
    </div>

    <p className="text-lg font-[PoppinsBold] text-parent-green sm:text-xl xl:text-2xl">
      {value}
    </p>
  </div>
);

const DashboardCards = ({ cards }) => {
  const STUDENT_CARDS = cards.slice(0, 4);
  const PAYMENT_CARDS = cards.slice(4);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {STUDENT_CARDS.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PAYMENT_CARDS.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
