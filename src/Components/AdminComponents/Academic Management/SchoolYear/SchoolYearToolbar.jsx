import React from "react";
import ResponsiveFilter from "../../ResponsiveFilter";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Archived", value: "archived" },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
];

function SchoolYearToolbar({
  activeFilter = "All",
  onFilterChange,
  onAddSchoolYear,
  searchValue = "",
  onSearchChange,
  onSearch,
}) {
  return (
    <div className="flex w-full flex-col gap-3 px-2 py-2 sm:px-5 md:flex-row md:flex-nowrap md:items-center">
      <div className="flex w-full min-w-0 items-center gap-3 md:contents">
        <ResponsiveFilter
          options={FILTERS}
          value={activeFilter}
          onChange={onFilterChange}
          label="Filter school years"
          className="md:order-1 md:flex-nowrap"
          mobileClassName="min-w-0 flex-1"
        />

        <button
          type="button"
          onClick={onAddSchoolYear}
          className="shrink-0 rounded-full bg-parent-green px-5 py-2 font-[Poppins] text-xs text-white transition hover:bg-parent-accent md:order-3 md:px-3"
        >
          Add School Year
        </button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch?.();
        }}
        className="flex w-full min-w-0 flex-1 items-center gap-2 md:order-2 md:ml-auto md:w-auto md:flex-none"
      >
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search School Year"
          className="w-full min-w-0 flex-1 rounded-full border border-parent-accent/25 bg-white/80 px-3 py-2 font-[Poppins] text-xs outline-none focus:border-parent-accent sm:w-56 sm:flex-none md:w-40 lg:w-40 xl:w-56"
        />

        <button
          type="submit"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-parent-green px-6 py-2 font-[Poppins] text-xs text-white transition hover:bg-parent-accent md:px-4"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SchoolYearToolbar;
