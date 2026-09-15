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
    <div className="flex h-11 w-full items-center justify-between py-1">
      <div className="flex items-center gap-2">
        <h2 className="font-[PoppinsBold] text-md text-swamp-green">
          {title} 
        </h2>
      </div>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-3">
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-8 w-32 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white px-4 pr-8 text-xs text-gray-600 outline-none transition hover:border-swamp-green focus:border-swamp-green"
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

        {/* Add Teacher */}
        <button
          type="button"
          onClick={onAddTeacher}
          className="h-8 rounded-full bg-[#9caf7d] px-4 text-xs font-[Poppins] text-white transition hover:opacity-90"
        >
          + Add Teacher
        </button>

        <div className="relative ml-3">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search Teacher"
            className="h-8 w-60 rounded-full border border-gray-300 bg-[#f7f7ff] pl-8 pr-4 text-xs text-gray-700 outline-none focus:border-[#9caf88]"
          />
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearch}
          className="h-8 rounded-full bg-[#9caf88] px-6 text-xs font-[Poppins] text-white transition hover:bg-[#879b72]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default TeacherToolbar;