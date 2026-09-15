import React from "react";
import { Search } from "lucide-react";

const ParentsToolbar = ({
  searchValue,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className="flex h-11 w-full items-center justify-between py-1">
      <div className="flex items-center gap-2">
        <h2 className="font-[PoppinsBold] text-md text-swamp-green">
          Parents
        </h2>
      </div>

      <div className="ml-auto flex items-center gap-3">
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

export default ParentsToolbar;