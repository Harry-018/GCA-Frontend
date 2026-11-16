import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = ({ navItems }) => {
  const { pathname } = useLocation();

  const isActive = (item) => {
    if (item.name === "Students") {
      return pathname === "/admin/academic" || pathname === "/admin/academic/";
    }
    if (item.name === "Section") {
      return (
        pathname === "/admin/academic/section" ||
        pathname === "/admin/academic/sectionclass" ||
        pathname === "/admin/academic/sectionInformation"
      );
    }
    if (item.name === "Schedules") {
      return (
        pathname === item.path ||
        pathname.startsWith(`${item.path}/`) ||
        pathname === "/admin/academic/schedulesection" ||
        pathname === "/admin/academic/setupschedule"
      );
    }
    return pathname === item.path || pathname.startsWith(`${item.path}/`);
  };

  return (
    <div className="flex w-full min-h-16 flex-nowrap items-center justify-between gap-x-5 overflow-x-auto rounded-2xl border border-parent-accent/20 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar sm:min-h-18 sm:gap-x-7 sm:px-4 sm:py-5">
      <div className="flex flex-nowrap items-center gap-x-5 sm:gap-x-7">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`whitespace-nowrap pb-1 text-[11px] transition lg:text-xs xl:text-sm ${
              isActive(item)
                ? "text-parent-green underline underline-offset-8"
                : "text-gray-600 hover:text-parent-green"
            }`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="flex flex-nowrap items-center gap-x-5 sm:gap-x-7">
        {navItems.slice(5).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`whitespace-nowrap pb-1 text-[11px] transition lg:text-xs xl:text-sm ${
              isActive(item)
                ? "text-parent-green underline underline-offset-8"
                : "text-gray-600 hover:text-parent-green"
            }`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Header;