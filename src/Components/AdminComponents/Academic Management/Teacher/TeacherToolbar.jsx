import React from "react";
import { Search } from "lucide-react";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "On Leave", value: "on_leave" },
  { label: "Resigned", value: "resigned" },
];

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
        <h2 className="font-[PoppinsBold] text-md text-parent-green">
          Teachers
        </h2>
      </div>

      {/* Controls */}
      <div className="ml-auto flex w-full flex-wrap items-center gap-3 md:w-auto">
        {/* Status */}
        <div className="flex flex-wrap items-center gap-3">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatusChange(option.value)}
              className={`rounded-full px-4 py-2 font-[Poppins] text-xs transition ${
                status === option.value
                  ? "bg-parent-green text-white"
                  : "text-gray-500 hover:bg-parent-accent/15"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

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
            className="h-8 w-full rounded-full border border-parent-accent/25 bg-white/80 pl-8 pr-4 text-xs text-gray-700 outline-none focus:border-parent-green"
          />
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={onSearch}
          className="h-8 shrink-0 rounded-full bg-parent-green px-6 text-xs text-white transition hover:bg-parent-accent"
        >
          Search
        </button>

        {/* Add */}
        <button
          type="button"
          onClick={onAdd}
          className="h-8 shrink-0 rounded-full bg-parent-green px-5 text-xs text-white transition hover:opacity-90"
        >
          + Add Teacher
        </button>
      </div>
    </div>
  );
};

export default TeacherToolbar;
