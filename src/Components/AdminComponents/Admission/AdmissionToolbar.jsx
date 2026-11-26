import React from "react";
import { Search } from "lucide-react";
import ResponsiveFilter from "../ResponsiveFilter";

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
  selectionDisabled,
}) => {
  return (
    <div
      className={`flex w-full flex-wrap items-center gap-3 py-4 ${
        selectionDisabled
          ? "sm:flex-nowrap"
          : "md:flex-nowrap"
      }`}
    >
      {/* Status pills — own row on small/tablet, shares row (right side) with Check Multiple on laptop */}
      <nav
        className={`-mx-1 order-2 flex w-full items-center gap-3 overflow-x-auto px-1 pb-1 min-[375px]:order-3 ${
          selectionDisabled
            ? "sm:order-1 sm:w-auto sm:shrink-0 sm:flex-nowrap sm:overflow-visible sm:pb-0"
            : "md:order-1 md:w-auto md:flex-nowrap md:overflow-visible md:pb-0"
        }`}
      >
        <ResponsiveFilter
          options={statuses.map((status) => ({
            label: status,
            value: status,
          }))}
          value={activeStatus}
          onChange={onStatusChange}
          label="Filter applications"
          mobileClassName="w-auto"
        />
      </nav>

      {/* Selection: Check Multiple (+ inline actions on small/tablet) */}
      {!selectionDisabled && (
        <div className="order-1 flex w-fit shrink-0 flex-wrap items-center gap-3 md:order-2 md:ml-auto md:w-auto md:flex-nowrap">
          <button
            type="button"
            onClick={onToggleSelectionMode}
            className={`inline-flex h-8 items-center whitespace-nowrap rounded-full px-4 text-[11px] font-[Poppins] text-white transition sm:px-7 sm:text-xs ${
              selectionMode
                ? "bg-reject hover:bg-reject/80"
                : "bg-parent-green hover:bg-parent-accent"
            }`}
          >
            {selectionMode ? "Cancel" : "Select"}
          </button>

          {/* Approve/Clear inline */}
          <div className="flex items-center gap-3">
            {selectionMode && (
              <>
                <button
                  type="button"
                  onClick={onApproveSelected}
                  className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-parent-green px-4 text-[11px] text-white transition hover:bg-parent-accent sm:px-5 sm:text-xs"
                >
                  Approve Selected
                </button>

                <button
                  type="button"
                  onClick={onClearSelection}
                  className="inline-flex h-8 items-center whitespace-nowrap rounded-full border border-parent-accent/25 px-4 text-[11px] text-gray-600 transition hover:bg-bone sm:px-5 sm:text-xs"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Search — top row on laptop */}
      <div
        className={`order-1 flex min-w-0 flex-1 items-center gap-2 min-[375px]:order-2 min-[375px]:basis-full ${
          selectionDisabled
            ? "sm:order-2 sm:ml-auto sm:w-80 sm:basis-80 sm:flex-none"
            : "md:order-3 md:ml-0 md:w-80 md:basis-80 md:flex-none md:justify-end"
        } ${
          selectionMode
            ? "md:hidden xl:flex xl:w-80 xl:basis-80 xl:flex-none"
            : ""
        }`}
      >
        <div className="relative w-full min-w-0 flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSearch();
              }
            }}
            placeholder="Search Applicants"
            className="h-8 w-full rounded-full border border-parent-accent/25 bg-white/80 pl-8 pr-4 text-[11px] text-gray-700 outline-none focus:border-parent-green sm:text-xs"
          />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full bg-parent-green px-6 text-[11px] text-white transition hover:bg-parent-accent sm:text-xs"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AdmissionToolbar;
