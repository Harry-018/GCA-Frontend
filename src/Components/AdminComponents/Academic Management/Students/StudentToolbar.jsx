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
    <div className="flex h-11 w-full items-center justify-between py-1">
      <div className="flex items-center gap-2">
        <h2 className="font-[PoppinsBold] text-md text-swamp-green">
          Students : 
        </h2>

        <p className="whitespace-nowrap text-md font-[PoppinsBold] text-gray-600">
          S.Y {schoolYear}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative">
          <select
            id="school-year-filter"
            value={activeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-8 w-32 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white px-4 pr-8 text-xs text-gray-600 outline-none transition hover:border-swamp-green focus:border-swamp-green"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
          <label
            htmlFor="school-year-filter"
            className="pointer-events-auto absolute bottom-0 right-0 top-0 flex w-8 cursor-pointer items-center justify-center"
          >
            <ChevronDown 
            size={14} 
            className="text-gray-500" />
          </label>
        </div>

        <div className="relative ml-3">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search Student"
            className="h-8 w-60 rounded-full border border-gray-300 bg-[#f7f7ff] pl-8 pr-4 text-xs text-gray-700 outline-none focus:border-[#9caf88]"
          />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="h-8 rounded-full bg-[#9caf88] px-6 text-xs font-medium text-white transition hover:bg-[#879b72]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default StudentToolbar;