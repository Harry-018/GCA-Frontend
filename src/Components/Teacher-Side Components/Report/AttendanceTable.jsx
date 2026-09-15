import React from "react";
import AttendanceRow from "./AttendanceRow";

const AttendanceTable = ({ students, dates }) => {
  return (
    <>
      <div className="w-full overflow-x-auto rounded-2xl bg-bone shadow-md no-scrollbar md:hidden">
        <div className="min-w-140">
          <div className="grid grid-cols-[minmax(110px,1.5fr)_repeat(8,minmax(32px,1fr))] items-center">
            <span className="sticky left-0 z-10 bg-bone py-3 pl-3 pr-6 text-[9px] font-[PoppinsBold] uppercase text-[#9caf7d] sm:text-xs">
              ID & Student
            </span>

            {dates.map((date) => (
              <span
                key={date}
                className="px-1 py-3 text-center text-[8px] font-[PoppinsBold] uppercase text-swamp-green sm:text-2xs"
              >
                {date}
              </span>
            ))}
          </div>

          {students.map((student) => (
            <AttendanceRow
              key={student.schoolId}
              student={student}
              dates={dates}
              layout="stacked"
            />
          ))}

        </div>
      </div>

      <div className="hidden w-full overflow-hidden rounded-2xl bg-[#e4e6f0] shadow-md md:flex lg:min-h-0 lg:flex-1">
        <div className="flex-none bg-bone">
          <div className="flex items-center gap-9 px-5 py-4">
            <span className="w-22.5 text-xs font-[PoppinsBold] uppercase text-swamp-green">
              School ID
            </span>

            <span className="w-44 text-xs font-[PoppinsBold] uppercase text-swamp-green">
              Full Name
            </span>
          </div>

          {students.map((student) => (
            <div
              key={student.schoolId}
              className="flex items-center gap-9 border-t border-gray-200 px-5 py-3"
            >
              <span className="w-22.5 min-w-0 truncate text-xs text-gray-500">
                {student.schoolId}
              </span>

              <span className="w-44 min-w-0 truncate font-[Poppins] text-xs text-gray-600">
                {student.name}
              </span>
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar lg:min-h-0 lg:overflow-auto">
          <div className="min-w-160">
            <div className="grid grid-cols-8 gap-10 border-b border-gray-200 px-5 py-4">
              {dates.map((date) => (
                <span
                  key={date}
                  className="text-center text-xs font-[PoppinsBold] uppercase text-[#9caf7d]"
                >
                  {date}
                </span>
              ))}
            </div>

            {students.map((student) => (
              <AttendanceRow
                key={student.schoolId}
                student={student}
                dates={dates}
                layout="pane"
              />
            ))}

          </div>
        </div>

      </div>
    </>
  );
};

export default AttendanceTable;
