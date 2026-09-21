import React from "react";
import { Search } from "lucide-react";

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
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green sm:text-sm md:text-md">
          Students :
        </h2>

        <p className="whitespace-nowrap text-sm font-[Poppins] text-gray-600 sm:text-sm md:text-md">
          S.Y {schoolYear}
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 md:ml-auto md:w-auto md:justify-end md:gap-3">
        <div className="flex shrink-0 gap-1.5 overflow-x-auto [-ms-overflow-style:none] scrollbar:none [&::-webkit-scrollbar]:hidden sm:gap-2 md:overflow-visible">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange?.(filter)}
              className={`inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 font-[Poppins] text-[11px] transition sm:px-5 sm:text-xs ${
                activeFilter === filter
                  ? "bg-swamp-green text-white"
                  : "bg-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
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