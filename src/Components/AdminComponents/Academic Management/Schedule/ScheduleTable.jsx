import React from "react";

const COLUMNS = ["Subject", "Teacher", "Day", "Time", "Room"];

const ScheduleTable = ({ schedules, onEdit, onRemove }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto thin-scrollbar">
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0">
              <tr className="bg-bone">
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    className="whitespace-nowrap px-6 py-5 text-left text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base"
                  >
                    {column}
                  </th>
                ))}

                <th className="whitespace-nowrap px-6 py-5 text-left text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-b border-gray-200 text-[11px] text-gray-600 last:border-b-0 lg:text-xs xl:text-sm"
                >
                  <td className="px-6 py-2.5">{schedule.subject}</td>
                  <td className="px-6 py-2.5">{schedule.teacher}</td>
                  <td className="px-6 py-2.5">{schedule.day}</td>
                  <td className="px-6 py-2.5">{schedule.time}</td>
                  <td className="px-6 py-2.5">{schedule.room}</td>

                  <td className="px-6 py-2.5">
                    <div className="flex items-center gap-2">
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
            </tbody>
          </table>

          {schedules.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
              <p className="text-sm text-gray-500">
                No schedules available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;