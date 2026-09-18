import React from "react";

const ScheduleTable = ({ schedules, onEdit, onRemove }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col overflow-x-auto overflow-y-auto thin-scrollbar">
          <table className="w-full min-w-xl border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-bone">
                <th className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base">
                  SUBJECT
                </th>
                <th className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base">
                  TEACHER
                </th>
                <th className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base">
                  DAY
                </th>
                <th className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base">
                  TIME
                </th>
                <th className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base">
                  ROOM
                </th>
                <th className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-b border-gray-200 text-2xs text-gray-600 last:border-b-0 sm:text-[11px] lg:text-xs xl:text-sm"
                >
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schedule.subject}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schedule.teacher}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schedule.day}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schedule.time}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schedule.room}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
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
              <p className="text-sm text-gray-500">No schedules available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;