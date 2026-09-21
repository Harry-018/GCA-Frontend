import React from "react";
import { Search, ChevronDown } from "lucide-react";

const TeacherToolbar = ({
  title,
  filter,
  filterOptions,
  searchValue,
  onFilterChange,
  onAddTeacher,
  onSearchChange,
  onSearch,
}) => {

  return (
    <div className="flex w-full flex-col gap-2 py-1 md:min-h-11 md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="flex items-center gap-3">
        <h2 className="font-[PoppinsBold] text-md text-swamp-green">
          {title} 
        </h2>
      </div>

      {/* Actions */}
      <div className="ml-auto flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-3">
        {/* Dropdown + Add Teacher — one line */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="h-8 w-28 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white px-3 pr-7 text-xs text-gray-600 outline-none transition hover:border-swamp-green focus:border-swamp-green"
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          <button
            type="button"
            onClick={onAddTeacher}
            className="h-8 shrink-0 rounded-full bg-[#9caf7d] px-4 text-xs font-[Poppins] text-white transition hover:opacity-90"
          >
            + Add Teacher
          </button>
        </div>

        {/* Search + Search Button — separate line on small */}
        <div className="relative ml-0 flex w-full items-center gap-2 md:ml-3 md:w-auto md:flex-none">
          <div className="relative min-w-0 flex-1 md:w-44 md:flex-none lg:w-48 xl:w-52">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search Teacher"
              className="h-8 w-full rounded-full border border-gray-300 bg-[#f7f7ff] pl-8 pr-4 text-xs text-gray-700 outline-none focus:border-[#9caf88]"
            />
          </div>

          <button
            type="button"
            onClick={onSearch}
            className="h-8 shrink-0 rounded-full bg-[#9caf88] px-6 text-xs font-[Poppins] text-white transition hover:bg-[#879b72]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherToolbar;