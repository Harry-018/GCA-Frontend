import React from "react";
import ScheduleCell from "../../../Components/Teacher-Side Components/Schedule/ScheduleCell";
import ScheduleTime from "../../../Components/Teacher-Side Components/Schedule/ScheduleTime";
import { getSchedule } from "../../../utils/data/Teacher/schedule";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const GRID_COLS =
  "grid min-w-[760px] grid-cols-[132px_repeat(5,minmax(100px,1fr))] sm:min-w-0 sm:grid-cols-[148px_repeat(5,minmax(0,1fr))] lg:grid-cols-[160px_repeat(5,1fr)]";

const ScheduleModal = ({ isOpen, onClose, sectionName }) => {
  const schedule = getSchedule();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-3 backdrop-blur-sm sm:p-5">
      <div className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col rounded-2xl bg-[#f4f5fc] shadow-lg sm:max-h-[calc(100dvh-2.5rem)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-x-3 border-b border-gray-200/80 px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="min-w-0 truncate font-[PoppinsBold] text-sm text-[#9caf7e] sm:text-base">
            Schedule - {sectionName}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none text-gray-400 transition hover:bg-gray-200/60 hover:text-gray-600"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Weekly Schedule Table */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-6 sm:py-4">
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-[#f4f5fc] [-ms-overflow-style:none] [scrollbar-width:thin] sm:overflow-x-visible">
            <div
              className={`${GRID_COLS} bg-[#9caf7e] text-[9px] font-[PoppinsBold] text-white sm:text-2xs lg:text-[11px]`}
            >
              <div className="flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-white/20 py-2.5 sm:py-3">
                TIME
              </div>

              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-white/20 px-1 py-2.5 last:border-r-0 sm:py-3"
                >
                  <span className="sm:hidden">{day.slice(0, 3).toUpperCase()}</span>
                  <span className="hidden sm:inline">{day.toUpperCase()}</span>
                </div>
              ))}
            </div>

            {schedule.map((row) => (
              <div
                key={row.time}
                className={`${GRID_COLS} min-h-16 border-b border-gray-200 last:border-b-0 sm:min-h-16 lg:min-h-16.5`}
              >
                <ScheduleTime time={row.time} />

                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="min-w-0 overflow-hidden border-r border-gray-200 last:border-r-0"
                  >
                    <ScheduleCell
                      section={row[day.toLowerCase()]?.section}
                      subject={row[day.toLowerCase()]?.subject}
                    />
                  </div>
                ))}
              </div>
            ))}

            {schedule.length === 0 && (
              <div className="flex h-32 min-w-[760px] items-center justify-center sm:min-w-0">
                <p className="text-xs text-gray-400">No schedule available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 justify-stretch border-t border-gray-200/80 px-4 py-3 sm:justify-end sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full rounded-full bg-[#9caf7e] px-8 font-[PoppinsBold] text-xs text-white transition hover:bg-[#899d6d] sm:h-9 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
