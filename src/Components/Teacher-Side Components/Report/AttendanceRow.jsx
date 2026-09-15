import React from "react";

const AttendanceRow = ({ student, dates, layout = "stacked" }) => {
  if (layout === "pane") {
    return (
      <div className="grid grid-cols-8 items-center gap-10 border-b border-gray-200 px-5 py-3">
        {dates.map((date) => {
          const isPresent = student.attendance[date];

          return (
            <div
              key={date}
              className="flex justify-center"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded text-[9px] font-[PoppinsBold] text-white ${
                  isPresent
                    ? "bg-swamp-green"
                    : "bg-[#f17a72]"
                }`}
              >
                {isPresent ? "P" : "A"}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[minmax(110px,1.5fr)_repeat(8,minmax(32px,1fr))] items-center border-t border-gray-200">
      <div className="sticky left-0 z-10 min-w-0 bg-bone py-2 pl-3 pr-6">
        <p className="min-w-0 truncate text-[9px] text-gray-500 sm:text-xs">
          {student.schoolId}
        </p>

        <p className="whitespace-nowrap text-[9px] font-[Poppins] text-gray-600 sm:text-xs">
          {student.name}
        </p>
      </div>

      {dates.map((date) => {
        const isPresent = student.attendance[date];

        return (
          <div
            key={date}
            className="flex justify-center px-1 py-2"
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded text-[8px] font-[PoppinsBold] text-white sm:h-5 sm:w-5 sm:text-[9px] ${
                isPresent
                  ? "bg-swamp-green"
                  : "bg-[#f17a72]"
              }`}
            >
              {isPresent ? "P" : "A"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceRow;
