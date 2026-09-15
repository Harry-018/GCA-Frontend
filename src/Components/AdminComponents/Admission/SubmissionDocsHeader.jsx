import { Search } from "lucide-react";

const SubmissionDocsHeader = ({
  title,
  date,
  onDateChange,
  search,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className="flex w-full items-center justify-between py-4">
      <h2 className="text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-700">
            Select Date:
          </label>

          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={onDateChange}
              className="w-36 rounded-full border border-gray-300 bg-[#f7f7ff] px-3 py-2 pr-8 text-xs text-gray-700 outline-none focus:border-[#9caf88]"
            />
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={onSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              placeholder="Search Applicants"
              className="w-60 rounded-full border border-gray-300 bg-[#f7f7ff] py-2 pl-8 pr-4 text-xs text-gray-700 outline-none focus:border-[#9caf88]"
            />
          </div>

          <button
            onClick={onSearch}
            className="rounded-full bg-[#9aae82] px-6 py-2 text-xs font-medium text-white hover:bg-[#879d70] transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDocsHeader;