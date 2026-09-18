import React from "react";
import { Search, ChevronDown } from "lucide-react";

const StudentToolbar = ({
  filters,
  activeFilter,
  onFilterChange,
  searchValue,
  onSearchChange,
  onSearch,
  schoolYear,
}) => {
  return (
    <div className="flex w-full flex-col gap-3 py-1 md:min-h-11 md:flex-row md:flex-wrap md:items-center md:justify-between">
      <div className="flex min-w-0 shrink-0 flex-wrap items-center gap-2">
        <h2 className="font-[PoppinsBold] text-xs text-swamp-green sm:text-sm md:text-md">
          Students :
        </h2>

        <p className="whitespace-nowrap text-xs font-[PoppinsBold] text-gray-600 sm:text-sm md:text-md">
          S.Y {schoolYear}
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 md:ml-auto md:w-auto md:justify-end md:gap-3">
        <div className="relative">
          <select
            id="school-year-filter"
            value={activeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-8 w-24 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white px-2.5 pr-7 text-[9px] leading-none text-gray-600 outline-none transition hover:border-swamp-green focus:border-swamp-green sm:w-24 sm:px-3 sm:pr-8 sm:text-xs"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
          <label
            htmlFor="school-year-filter"
            className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center sm:right-4"
          >
            <ChevronDown
              size={12}
              className="text-gray-500"
            />
          </label>
        </div>

        <div className="flex flex-1 items-center gap-2 md:ml-3 md:w-auto md:flex-none">
          <div className="relative min-w-0 flex-1 sm:flex-none">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-3"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search Student"
              className="h-8 w-full rounded-full border border-gray-300 bg-[#f7f7ff] pl-6 pr-3 text-[9px] text-gray-700 outline-none focus:border-[#9caf88] sm:w-48 sm:pl-8 sm:pr-4 sm:text-xs lg:w-44 xl:w-52"
            />
          </div>

          <button
            type="button"
            onClick={onSearch}
            className="h-8 shrink-0 rounded-full bg-[#9caf88] px-3 text-[9px] font-medium text-white transition hover:bg-[#879b72] sm:px-6 sm:text-xs"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentToolbar;