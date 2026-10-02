import React from "react";

const TABS = ["Announcements", "Notifications"];

const Header = ({ activeTab = "Announcements", onTabChange }) => {
  return (
    <header className="flex w-full flex-nowrap items-center gap-x-5 overflow-x-auto rounded-2xl border border-gray-200 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar sm:gap-x-7 sm:px-4 sm:py-5">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange?.(tab)}
          className={`shrink-0 whitespace-nowrap pb-1 text-[11px] font-medium transition lg:text-xs xl:text-sm ${
            activeTab === tab
              ? "text-swamp-green underline underline-offset-8"
              : "text-gray-600 hover:text-swamp-green"
          }`}
        >
          {tab}
        </button>
      ))}
    </header>
  );
};

export default Header;