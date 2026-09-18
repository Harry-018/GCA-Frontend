import React from "react";

const UserToolbar = ({
  activeTab = "All",
  onTabChange,
  search = "",
  onSearchChange,
  onSearch,
  searchPlaceholder = "Search Account",
}) => {
  const tabs = ["All", "Parent", "Teacher"];

  return (
    <div className="flex w-full flex-col gap-2 py-1 md:flex-row md:flex-nowrap md:items-center md:justify-end md:gap-3">
      {/* Role pills — beside search from md up */}
      <div className="flex shrink-0 gap-1.5 overflow-x-auto [-ms-overflow-style:none] scrollbar:none [&::-webkit-scrollbar]:hidden sm:gap-2 md:overflow-visible">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange?.(tab)}
            className={`inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 font-[Poppins] text-[11px] transition sm:px-5 sm:text-xs ${
              activeTab === tab
                ? "bg-swamp-green text-white"
                : "bg-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex w-full min-w-0 items-center gap-2 md:w-auto md:flex-none">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch?.();
          }}
          placeholder={searchPlaceholder}
          className="h-8 w-full min-w-0 flex-1 rounded-full border border-gray-300 bg-[#f5f6fc] px-3 font-[Poppins] text-[11px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#9caf7b] sm:px-4 sm:text-xs md:w-52 md:flex-none lg:w-58"
        />

        <button
          type="button"
          onClick={onSearch}
          className="inline-flex h-8 shrink-0 items-center rounded-full bg-[#9caf7b] px-4 font-[Poppins] text-[11px] text-white transition hover:bg-[#8da06e] sm:px-6 sm:text-xs"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default UserToolbar;
