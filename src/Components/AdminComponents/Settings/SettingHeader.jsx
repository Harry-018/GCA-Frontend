import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "School Information", path: "/admin/settings" },
  { label: "Section Names", path: "/admin/settings/section-name" },
  { label: "Subjects", path: "/admin/settings/subjects" },
];

const SettingHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex w-full min-h-16 flex-nowrap items-center gap-x-5 overflow-x-auto rounded-2xl border border-parent-accent/20 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar sm:min-h-18 sm:gap-x-7 sm:px-4 sm:py-5">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.path !== "/admin/settings" &&
            pathname.startsWith(`${item.path}/`));

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`shrink-0 whitespace-nowrap pb-1 text-[11px] transition lg:text-xs xl:text-sm ${
              isActive
                ? "text-parent-green underline underline-offset-8"
                : "text-gray-600 hover:text-parent-green"
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
