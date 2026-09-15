import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  studentName,
  setStudentName,
  onSearch,
}) => {

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl bg-bone px-3 py-3 shadow-md sm:px-4 sm:py-4 md:flex-row md:items-center md:gap-4">
      <div className="flex w-full items-center gap-1.5 sm:gap-2 md:w-auto">
        <div className="relative min-w-0 flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-3 sm:size-4"
          />
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Search Students"
            className="h-7 w-full min-w-0 rounded-xl border border-gray-400 bg-transparent pl-7 pr-2.5 text-2xs outline-none placeholder:text-gray-500 focus:border-swamp-green sm:h-8 sm:pl-9 sm:px-4 sm:text-xs"
          />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="h-7 shrink-0 rounded-xl bg-gray-400 px-3 text-2xs font-[PoppinsBold] text-white transition-colors hover:bg-swamp-green sm:h-8 sm:px-5 sm:text-xs"
        >
          search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
