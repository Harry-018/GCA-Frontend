import React from "react";

const ScheduleToolbar = ({
  sectionName,
  schoolYear,
  days = [],
  activeDay,
  onDayChange,
  onViewSchedule,
  onAddSchedule,
}) => {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green sm:text-md">
          {sectionName}
        </h2>

        <span className="font-[Poppins] text-xs text-gray-600 sm:text-sm">
          S.Y: {schoolYear}
        </span>
      </div>

      {/* Toolbar Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-end">
        <div className="flex flex-wrap items-center gap-1">
          {days.map((day) => (
            <button
              key={day.value}
              type="button"
              onClick={() => onDayChange?.(day.value)}
              className={`rounded-full px-3 py-2 font-[Poppins] text-xs transition ${
                activeDay === day.value
                  ? "bg-[#9caf7c] font-[PoppinsBold] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Schedule Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onViewSchedule}
            className="rounded-full border border-gray-400 bg-[#f7f8ff] px-5 py-2 font-[Poppins] text-xs text-gray-600 transition hover:bg-gray-100"
          >
            View Schedule
          </button>

          <button
            type="button"
            onClick={onAddSchedule}
            className="rounded-full bg-[#9caf7c] px-5 py-2 font-[PoppinsBold] text-xs text-white transition hover:opacity-90"
          >
           + Add Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleToolbar;