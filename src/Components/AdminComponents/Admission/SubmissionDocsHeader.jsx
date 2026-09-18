import React from "react";
import { Search } from "lucide-react";

const DateFilter = ({ date, onDateChange }) => {
  return (
    <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto">
      <label className="shrink-0 whitespace-nowrap text-2xs text-gray-700 sm:text-xs">
        Select Date:
      </label>

      <input
        type="date"
        value={date}
        onChange={onDateChange}
        className="h-8 min-w-0 flex-1 rounded-full border border-gray-300 bg-[#f7f7ff] px-3 text-[11px] text-gray-700 outline-none focus:border-[#9caf88] sm:w-36 sm:flex-none sm:text-xs"
      />
    </div>
  );
};

// Search input
const SearchInput = ({
  search,
  onSearchChange,
  onSearch,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative w-full min-w-0 flex-1 lg:max-w-lg xl:max-w-xl xl:flex-none xl:w-72">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Applicants"
        className="h-8 w-full rounded-full border border-gray-300 bg-[#f7f7ff] pl-8 pr-4 text-[11px] text-gray-700 outline-none focus:border-[#9caf88] sm:text-xs"
      />
    </div>
  );
};

// Search button
const SearchButton = ({ onSearch }) => {
  return (
    <button
      type="button"
      onClick={onSearch}
      className="h-8 shrink-0 whitespace-nowrap rounded-full bg-[#9aae82] px-6 text-[11px] font-medium text-white transition hover:bg-[#879d70] sm:text-xs"
    >
      Search
    </button>
  );
};

// Search controls
const SubmissionSearch = ({
  search,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className="flex w-full min-w-0 items-center gap-2 sm:flex-1 md:w-auto md:flex-none">
      <SearchInput
        search={search}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
      />

      <SearchButton onSearch={onSearch} />
    </div>
  );
};

// Main header
const SubmissionDocsHeader = ({
  title,
  date,
  onDateChange,
  search,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className="flex w-full flex-col gap-4 py-4 sm:gap-3 md:flex-row md:items-center md:justify-between">
      <h2 className="text-xs font-[PoppinsBold] text-swamp-green sm:text-sm lg:text-base">
        {title}
      </h2>

      {/* Filters and search */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:w-auto md:justify-end md:gap-4">
        <DateFilter
          date={date}
          onDateChange={onDateChange}
        />

        <SubmissionSearch
          search={search}
          onSearchChange={onSearchChange}
          onSearch={onSearch}
        />
      </div>
    </div>
  );
};

export default SubmissionDocsHeader;