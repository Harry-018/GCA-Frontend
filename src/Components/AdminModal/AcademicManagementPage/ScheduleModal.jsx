import React from "react";
import ScheduleCell from "../../../Components/Teacher-Side Components/Schedule/ScheduleCell";
import ScheduleTime from "../../../Components/Teacher-Side Components/Schedule/ScheduleTime";
import { getSchedule } from "../../../utils/data/Teacher/schedule";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ScheduleModal = ({ isOpen, onClose, sectionName }) => {
  const schedule = getSchedule();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5 backdrop-blur-sm">
      <div className="flex w-full max-w-6xl flex-col gap-y-5 rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
        <h2 className="flex items-center justify-between">
          <span className="font-[PoppinsBold] text-base text-[#9caf7e]">
            Schedule - {sectionName}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="text-xl leading-none text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            &times;
          </button>
        </h2>

        {/* Weekly Schedule Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-[#f4f5fc]">
          <div className="grid min-w-150 grid-cols-[90px_repeat(5,1fr)] bg-[#9caf7e] text-[9px] font-[PoppinsBold] text-white sm:grid-cols-[148px_repeat(5,1fr)] sm:text-[11px]">
            <div className="flex items-center justify-center border-r border-white/20 py-2 sm:py-3">
              TIME
            </div>

            {DAYS.map((day) => (
              <div
                key={day}
                className="flex items-center justify-center border-r border-white/20 py-2 last:border-r-0 sm:py-3"
              >
                {day.toUpperCase()}
              </div>
            ))}
          </div>

          {schedule.map((row) => (
            <div
              key={row.time}
              className="grid h-14 grid-cols-[90px_repeat(5,1fr)] border-b border-gray-200 last:border-b-0 sm:h-16.5 sm:grid-cols-[148px_repeat(5,1fr)]"
            >
              <ScheduleTime time={row.time} />

              {DAYS.map((day) => (
                <div key={day} className="border-r border-gray-200 last:border-r-0">
                  <ScheduleCell
                    section={row[day.toLowerCase()]?.section}
                    subject={row[day.toLowerCase()]?.subject}
                  />
                </div>
              ))}
            </div>
          ))}

          {schedule.length === 0 && (
            <div className="flex h-32 items-center justify-center">
              <p className="text-xs text-gray-400">
                No schedule available.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-full bg-[#9caf7e] px-8 font-[PoppinsBold] text-xs text-white transition hover:bg-[#899d6d]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;