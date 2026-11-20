import React from "react";
import { Search, Upload } from "lucide-react";

const SearchBar = ({
  studentName,
  setStudentName,
  onSearch,
  onUpload,
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-parent-accent/15 bg-bone px-3 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:px-4 md:flex-row md:items-center md:justify-between md:gap-3">
      <div className="flex w-full items-center gap-1.5 sm:gap-2 md:w-80 lg:w-96">
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
            className="h-9 w-full min-w-0 rounded-xl border border-gray-400 bg-transparent pl-7 pr-2.5 text-2xs outline-none placeholder:text-gray-500 focus:border-parent-green sm:h-8 sm:pl-9 sm:pr-4 sm:text-xs"
          />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="h-9 shrink-0 rounded-xl bg-gray-400 px-3 text-2xs font-[PoppinsBold] text-white transition-colors hover:bg-parent-green sm:h-8 sm:px-5 sm:text-xs"
        >
          search
        </button>
      </div>

      <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-end">
        {onUpload && (
          <button
            type="button"
            onClick={onUpload}
            className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-parent-green bg-parent-green px-3 text-[9px] font-[PoppinsBold] text-white transition-colors hover:bg-parent-accent sm:h-8 sm:px-4 sm:text-xs"
          >
            <Upload size={15} />
            Upload Grades
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
