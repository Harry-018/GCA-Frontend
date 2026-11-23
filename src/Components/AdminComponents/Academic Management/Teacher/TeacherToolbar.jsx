import React from "react";
import { Search } from "lucide-react";
import ResponsiveFilter from "../../ResponsiveFilter";

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
    <div className="flex w-full flex-col gap-2 py-1 md:h-auto md:items-stretch xl:h-11 xl:flex-row xl:items-center xl:justify-between">
      {/* Title */}
      <div className="flex items-center gap-2">
        <h2 className="font-[PoppinsBold] text-md text-parent-green">
          Teachers
        </h2>
      </div>

      {/* Controls */}
      <div className="flex w-full min-w-0 flex-wrap items-center gap-2 md:flex-nowrap md:justify-between xl:ml-auto xl:w-auto xl:gap-3">
        {/* Status */}
        <ResponsiveFilter
          options={STATUS_OPTIONS}
          value={status}
          onChange={onStatusChange}
          label="Filter teachers"
          className="sm:order-1 md:flex-nowrap"
          mobileClassName="order-1 min-w-0 flex-1"
        />

        {/* Search */}
        <div className="order-3 flex w-full min-w-0 items-center gap-2 sm:order-2 sm:w-auto sm:flex-none xl:order-2 xl:flex-none">
          <div className="relative w-full min-w-0 flex-1 md:w-40 md:flex-none lg:w-40 xl:w-52">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search Teacher"
              className="h-8 w-full min-w-0 rounded-full border border-parent-accent/25 bg-white/80 pl-8 pr-4 font-[Poppins] text-xs text-gray-700 outline-none focus:border-parent-green"
            />
          </div>

          {/* Search button */}
          <button
            type="button"
            onClick={onSearch}
            className="h-8 shrink-0 rounded-full bg-parent-green px-4 font-[Poppins] text-xs text-white transition hover:bg-parent-accent sm:px-6"
          >
            Search
          </button>
        </div>

        {/* Add */}
        <button
          type="button"
          onClick={onAdd}
          className="order-2 h-8 shrink-0 rounded-full bg-parent-green px-4 font-[Poppins] text-xs text-white transition hover:opacity-90 sm:order-3 sm:ml-auto sm:px-5 md:ml-0 xl:order-3"
        >
          + Add Teacher
        </button>
      </div>
    </div>
  );
};

export default TeacherToolbar;
