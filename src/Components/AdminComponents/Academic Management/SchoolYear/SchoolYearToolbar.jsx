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
    <div className="flex w-full min-w-0 flex-col gap-2 px-4 py-2 sm:px-5 md:flex-row md:flex-nowrap md:items-center md:gap-2">
      {/* 1st on mobile — Add */}
      <button
        type="button"
        onClick={onAddSchoolYear}
        className="h-8 w-full shrink-0 whitespace-nowrap rounded-full bg-swamp-green px-3.5 font-[Poppins] text-xs leading-none text-white transition hover:bg-lime-green md:order-2 md:ml-auto md:w-auto"
      >
        Add School Year
      </button>

      {/* 2nd on mobile — Search */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch?.();
        }}
        className="flex w-full min-w-0 items-center gap-2 md:order-3 md:w-auto md:flex-none"
      >
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search School Year"
          className="h-8 w-full min-w-0 flex-1 rounded-full border border-gray-300 bg-[#f7f7fc] px-3 font-[Poppins] text-xs leading-none outline-none focus:border-lime-green md:w-40 md:flex-none lg:w-52"
        />
        <button
          type="submit"
          className="h-8 shrink-0 whitespace-nowrap rounded-full bg-swamp-green px-4 font-[Poppins] text-xs leading-none text-white transition hover:bg-lime-green"
        >
          Search
        </button>
      </form>

      {/* 3rd on mobile — Filter pills (first on tablet+) */}
      <div className="mt-3 flex min-w-0 gap-1.5 overflow-x-auto [-ms-overflow-style:none] scrollbar:none [&::-webkit-scrollbar]:hidden md:order-1 md:mt-0 md:shrink-0 md:gap-2 md:overflow-visible">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange?.(filter)}
            className={`h-8 shrink-0 whitespace-nowrap rounded-full px-3 font-[Poppins] text-xs leading-none transition ${
              activeFilter === filter
                ? "bg-swamp-green text-white"
                : "text-gray-500 hover:bg-[#e4e8dd]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SchoolYearToolbar;
