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
        pathname === "/admin/academic/schedules" ||
        pathname === "/admin/academic/schedulesection" ||
        pathname === "/admin/academic/setupschedule"
      );
    }
    if (item.name === "Grade Levels") {
      return (
        pathname === "/admin/academic/grade-levels" ||
        pathname === "/admin/academic/core-subjects" ||
        pathname === "/admin/academic/skills"
      );
    }
    return item.path === pathname;
  };

  return (
    <div className="flex w-full flex-nowrap items-center justify-between gap-x-8 overflow-x-auto rounded-2xl bg-bone px-4 py-5 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar">
      <div className="flex flex-nowrap items-center gap-x-8">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`whitespace-nowrap pb-1 text-[11px] font-medium transition lg:text-xs xl:text-sm ${
              isActive(item)
                ? "text-swamp-green underline underline-offset-8"
                : "text-gray-600 hover:text-swamp-green"
            }`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="flex flex-nowrap items-center gap-x-8">
        {navItems.slice(5).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`whitespace-nowrap pb-1 text-[11px] font-medium transition lg:text-xs xl:text-sm ${
              isActive(item)
                ? "text-swamp-green underline underline-offset-8"
                : "text-gray-600 hover:text-swamp-green"
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