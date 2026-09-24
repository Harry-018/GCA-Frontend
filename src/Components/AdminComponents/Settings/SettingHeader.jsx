import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "School Information", path: "/admin/settings" },
  { label: "Section Names", path: "/admin/sectionname" },
];

const SettingHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex w-full flex-nowrap items-center gap-x-5 overflow-x-auto rounded-2xl border border-gray-200 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar sm:gap-x-7 sm:px-4 sm:py-5">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`shrink-0 whitespace-nowrap pb-1 text-[11px] font-medium transition lg:text-xs xl:text-sm ${
              isActive
                ? "text-swamp-green underline underline-offset-8"
                : "text-gray-600 hover:text-swamp-green"
            }`}
          >
            {item.label}
          </NavLink>
        );
      })}
    </header>
  );
};

export default SettingHeader;