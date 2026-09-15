import React from "react";
import { CalendarDays, Search } from "lucide-react";

const AttendanceToolbar = ({
  studentName,
  setStudentName,
  selectedDate,
  setSelectedDate,
  onSearch,
  onSave,
  onReport,
}) => {

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl bg-bone px-3 py-3 shadow-md sm:px-4 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
      <div className="flex w-full items-center gap-1.5 sm:gap-2 md:w-auto">
        <div className="relative min-w-0 flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-3 sm:size-4"
          />
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Search Students"
            className="h-7 w-full min-w-0 rounded-xl border border-gray-400 bg-transparent pl-7 pr-2 text-[9px] text-gray-600 outline-none placeholder:text-gray-500 focus:border-swamp-green sm:h-8 sm:pl-9 sm:pr-3 sm:text-xs"
          />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="h-7 shrink-0 rounded-xl bg-gray-400 px-2.5 text-[9px] font-[PoppinsBold] text-white transition-colors hover:bg-swamp-green sm:h-8 sm:px-4 sm:text-xs"
        >
          search
        </button>
      </div>

      <div className="flex w-full shrink-0 items-center gap-1.5 sm:gap-2 md:w-auto md:justify-end">
        <div className="relative min-w-0 flex-1 sm:flex-initial">
          <CalendarDays
            size={12}
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 sm:left-3 sm:size-4"
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-7 w-full min-w-0 rounded-xl border border-gray-400 bg-transparent pl-6 pr-2 text-[9px] text-gray-600 outline-none focus:border-swamp-green sm:h-8 sm:w-40 sm:pl-9 sm:pr-3 sm:text-xs"
          />
        </div>

        <button
          type="button"
          onClick={onSave}
          className="h-7 shrink-0 rounded-xl bg-swamp-green px-2.5 text-[9px] font-[PoppinsBold] text-white transition-colors hover:bg-swamp-green sm:h-8 sm:px-5 sm:text-xs"
        >
          SAVE
        </button>

        <button
          type="button"
          onClick={onReport}
          className="h-7 shrink-0 rounded-xl border border-gray-400 bg-transparent px-2 text-[9px] font-[PoppinsBold] text-gray-500 transition-colors hover:border-swamp-green hover:text-swamp-green sm:h-8 sm:px-4 sm:text-xs"
        >
          REPORT
        </button>
      </div>
    </div>
  );
};

export default AttendanceToolbar;
