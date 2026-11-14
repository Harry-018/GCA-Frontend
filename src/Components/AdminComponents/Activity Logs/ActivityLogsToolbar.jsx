import React from "react";

const ActivityLogsToolbar = ({
  search = "",
  onSearchChange,
  onSearch,
  searchPlaceholder = "Search Activity Logs",
}) => {
  return (
    <div className="flex w-full flex-col gap-2 py-1 md:flex-row md:flex-nowrap md:items-center md:justify-end md:gap-3">
      <div className="flex w-full min-w-0 items-center gap-2 md:w-auto md:flex-none">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch?.();
          }}
          placeholder={searchPlaceholder}
          className="h-8 w-full min-w-0 flex-1 rounded-full border border-parent-accent/25 bg-white/80 px-3 font-[Poppins] text-[11px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-parent-green sm:px-4 sm:text-xs md:w-52 md:flex-none lg:w-58"
        />

        <button
          type="button"
          onClick={onSearch}
          className="inline-flex h-8 shrink-0 items-center rounded-full bg-parent-green px-4 font-[Poppins] text-[11px] text-white transition hover:bg-parent-accent sm:px-6 sm:text-xs"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ActivityLogsToolbar;
