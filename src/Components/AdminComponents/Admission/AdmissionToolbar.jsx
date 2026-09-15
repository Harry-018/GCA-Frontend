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
    <>
      <div className="flex items-center justify-between py-6">
        <nav className="flex items-center gap-5">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
              className={`rounded-full px-4 py-1.5 text-[11px] font-[Poppins] transition lg:text-xs xl:text-sm ${
                activeStatus === status
                  ? "bg-swamp-green text-white"
                  : "text-gray-600 hover:text-swamp-green"
              }`}
            >
              {status}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSelectionMode}
            className="rounded-full bg-swamp-green px-7 py-2 text-xs font-[Poppins] text-white transition hover:bg-swamp-green"
          >
            {selectionMode ? "Cancel" : "Check Multiple"}
          </button>

          {selectionMode && (
            <>
              <button
                type="button"
                onClick={onApproveSelected}
                className="rounded-full bg-swamp-green px-5 py-2 text-xs font-medium text-white transition hover:bg-swamp-green"
              >
                Approve Selected
              </button>

              <button
                type="button"
                onClick={onClearSelection}
                className="rounded-full border border-gray-300 px-5 py-2 text-xs font-medium text-gray-600 transition hover:bg-white"
              >
                Clear
              </button>
            </>
          )}

          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search Applicants"
              className="w-60 rounded-full border border-gray-300 bg-[#f7f7ff] py-2 pl-8 pr-4 text-xs text-gray-700 outline-none focus:border-[#9caf88]"
            />
          </div>

          <button
            onClick={onSearch}
            className="w-24 rounded-full bg-[#9aae82] px-6 py-2 text-xs font-medium text-white hover:bg-[#879d70] transition"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default AdmissionToolbar;