import React from "react";

const ScheduleTable = ({ schedules, onEdit, onRemove }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-gray-200 bg-bone shadow-sm">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-auto thin-scrollbar">
        <table className="w-full min-w-xl border-separate border-spacing-0">
          <thead className="sticky top-0">
            <tr className="bg-bone text-left text-[11px] font-[PoppinsBold] uppercase text-swamp-green sm:text-xs lg:text-sm xl:text-base">
              <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-5">
                Subject
              </th>
              <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-5">
                Teacher
              </th>
              <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-5">
                Day
              </th>
              <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-5">
                Time
              </th>
              <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-5">
                Room
              </th>
              <th className="whitespace-nowrap px-3 py-3 text-center sm:px-6 sm:py-5">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-2xs text-gray-600 sm:text-[11px] lg:text-xs xl:text-sm">
            {schedules.map((schedule, index) => (
              <tr
                key={schedule.id}
                className={`border-b border-gray-200 last:border-b-0 ${
                  index % 2 === 0 ? "bg-white" : "bg-bone"
                }`}
              >
                <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                  {schedule.subject}
                </td>
                <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-2.5">
                  {schedule.teacher}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                  {schedule.day}
                </td>
                <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-2.5">
                  {schedule.time}
                </td>
                <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-2.5">
                  {schedule.room}
                </td>

                <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(schedule)}
                      className="rounded-xl border border-gray-400 bg-swamp-green px-3.5 py-1 text-[11px] text-white transition hover:opacity-80 lg:text-xs xl:text-sm"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemove(schedule)}
                      className="rounded-xl bg-[#ff7272] px-3.5 py-1 text-[11px] text-white transition hover:bg-[#f45f5f] lg:text-xs xl:text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {schedules.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-3 py-12 text-center text-sm text-gray-400 sm:px-6"
                >
                  No schedules available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;