import React from "react";
import { Search, ChevronDown } from "lucide-react";

const TeacherToolbar = ({
  searchValue,
  onSearchChange,
  onSearch,
  status,
  onStatusChange,
  onAdd,
}) => {
  return (
    <div className="flex w-full flex-col gap-2 py-1 md:h-11 md:flex-row md:items-center md:justify-between">
      {/* Title */}
      <div className="flex items-center gap-2">
        <h2 className="font-[PoppinsBold] text-md text-swamp-green">
          Teachers
        </h2>
      </div>

      {/* Controls */}
      <div className="ml-auto flex w-full items-center gap-2 md:w-auto">
        {/* Status */}
        <select
          value={status}
          onChange={onStatusChange}
          className="h-8 min-w-27.5 rounded-full border py-0 border-gray-300 bg-[#f7f7ff] px-4 text-xs text-gray-700 outline-none focus:border-[#9caf88]"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="on_leave">On Leave</option>
          <option value="resigned">Resigned</option>
        </select>

        {/* Search */}
        <div className="relative min-w-0 flex-1 md:w-48 md:flex-none lg:w-48 xl:w-52">
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

        {/* Search button */}
        <button
          type="button"
          onClick={onSearch}
          className="h-8 shrink-0 rounded-full bg-[#9caf88] px-6 text-xs font-medium text-white transition hover:bg-[#879b72]"
        >
          Search
        </button>

        {/* Add */}
        <button
          type="button"
          onClick={onAdd}
          className="h-8 shrink-0 rounded-full bg-swamp-green px-5 text-xs font-medium text-white transition hover:opacity-90"
        >
          + Add Teacher
        </button>
      </div>
    </div>
  );
};

export default TeacherToolbar;
