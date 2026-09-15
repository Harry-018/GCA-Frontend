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
    return item.path === pathname;
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-7 gap-y-2 rounded-2xl border border-gray-200 bg-bone px-4 py-5 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <div className="flex flex-wrap items-center gap-x-13 gap-y-2 pl-1">
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

      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 pr-1">
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