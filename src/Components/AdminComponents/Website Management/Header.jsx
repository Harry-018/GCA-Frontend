import React from "react";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", key: "home", path: "/admin/website/home", subTabs: ["home", "mission-vision", "activities"] },
  { label: "Transportation", key: "transportation", path: "/admin/website/transpo", subTabs: ["transportation"] },
  { label: "Tuition Fee", key: "tuition", path: "/admin/website/tuition", subTabs: ["tuition"] },
];

const Header = ({ activeTab = "home", onTabChange }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    onTabChange?.(item.key);
    navigate(item.path);
  };

  return (
    <header className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-gray-200 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:gap-x-7 sm:px-4 sm:py-5">
      {NAV_ITEMS.map((item) => {
        const isActive = item.subTabs.includes(activeTab);

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => handleClick(item)}
            className={`whitespace-nowrap pb-1 text-[9px] font-medium transition sm:text-[11px] md:text-sm ${
              isActive
                ? "text-swamp-green underline underline-offset-8"
                : "text-gray-600 hover:text-swamp-green"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </header>
  );
};

export default Header;