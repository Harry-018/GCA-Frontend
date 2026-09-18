import React from "react";
import { Search } from "lucide-react";

const AdmissionToolbar = ({
  statuses,
  activeStatus,
  search,
  onStatusChange,
  onSearchChange,
  onSearch,
  onApproveSelected,
  onClearSelection,
  selectionMode,
  onToggleSelectionMode,
}) => {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 py-4 xl:flex-nowrap">
      {/* Status pills — own row on small/tablet, shares row (right side) with Check Multiple on laptop */}
      <nav className="-mx-1 order-3 flex w-full items-center gap-3 overflow-x-auto px-1 pb-1 sm:gap-5 md:order-2 md:w-auto md:flex-wrap md:overflow-visible md:pb-0 lg:order-2 lg:w-auto lg:flex-nowrap lg:shrink-0 lg:pb-0 xl:order-0 xl:w-auto">        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={`inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 text-[11px] font-[Poppins] transition sm:text-xs ${
              activeStatus === status
                ? "bg-swamp-green text-white"
                : "text-gray-600 hover:text-swamp-green"
            }`}
          >
            {status}
          </button>
        ))}
      </nav>

      {/* Selection: Check Multiple (+ inline actions on small/tablet) */}
      <div className="order-1 flex w-full flex-wrap items-center gap-3 md:shrink-0 lg:order-1 lg:w-full xl:order-0 xl:w-auto xl:ml-auto">
        <button
          type="button"
          onClick={onToggleSelectionMode}
          className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-swamp-green px-4 text-[11px] font-[Poppins] text-white transition hover:bg-swamp-green sm:px-7 sm:text-xs"
        >
          {selectionMode ? "Cancel" : "Check Multiple"}
        </button>

        {/* Approve/Clear inline */}
        <div className="flex items-center gap-3">
          {selectionMode && (
            <>
              <button
                type="button"
                onClick={onApproveSelected}
                className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-swamp-green px-4 text-[11px] font-medium text-white transition hover:bg-swamp-green sm:px-5 sm:text-xs"
              >
                Approve Selected
              </button>

              <button
                type="button"
                onClick={onClearSelection}
                className="inline-flex h-8 items-center whitespace-nowrap rounded-full border border-gray-300 px-4 text-[11px] font-medium text-gray-600 transition hover:bg-white sm:px-5 sm:text-xs"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search — top row on laptop */}
      <div className="order-2 flex w-full min-w-0 flex-1 items-center gap-2 md:w-auto md:ml-auto lg:w-auto lg:ml-auto xl:order-0 xl:ml-0 xl:flex-none xl:justify-end">
        <div className="relative w-full min-w-0 flex-1 lg:max-w-lg xl:max-w-xl xl:flex-none xl:w-72">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Search Applicants"
            className="h-8 w-full rounded-full border border-gray-300 bg-[#f7f7ff] pl-8 pr-4 text-[11px] text-gray-700 outline-none focus:border-[#9caf88] sm:text-xs"
          />
        </div>

        <button
          onClick={onSearch}
          className="inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full bg-[#9aae82] px-6 text-[11px] font-medium text-white transition hover:bg-[#879d70] sm:text-xs"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AdmissionToolbar;