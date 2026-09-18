import React from "react";

const FILTERS = ["All", "Archived", "Active", "Draft"];

function SchoolYearToolbar({
  activeFilter = "All",
  onFilterChange,
  onAddSchoolYear,
  searchValue = "",
  onSearchChange,
  onSearch,
}) {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 px-5 py-2 md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange?.(filter)}
            className={`rounded-full px-4 py-2 font-[Poppins] text-xs transition ${
              activeFilter === filter
                ? "bg-swamp-green text-white"
                : "text-gray-500 hover:bg-[#e4e8dd]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 md:ml-auto">
        <button
          type="button"
          onClick={onAddSchoolYear}
          className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-xs text-white transition hover:bg-lime-green"
        >
          Add School Year
        </button>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch?.();
          }}
          className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search School Year"
            className="w-full min-w-0 flex-1 rounded-full border border-gray-300 bg-[#f7f7fc] px-3 py-2 font-[Poppins] text-xs outline-none focus:border-lime-green sm:w-56 sm:flex-none"
          />

          <button
            type="submit"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-swamp-green px-6 py-2 font-[Poppins] text-xs text-white transition hover:bg-lime-green"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SchoolYearToolbar;