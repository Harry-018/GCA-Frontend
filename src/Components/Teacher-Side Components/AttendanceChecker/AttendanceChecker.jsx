import React from "react";
import { ChevronDown } from "lucide-react";

const AttendanceChecker = ({
  students,
  attendance,
  attendanceOptions,
  onAttendanceChange,
}) => {
  return (
    <div className="rounded-3xl border border-swamp-green/10 bg-white p-2 shadow-sm sm:p-4 md:p-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="flex flex-col gap-2 lg:min-h-0 lg:flex-1">

        {/* Mobile & Tablet: Sticky scroll */}
        <div className="no-scrollbar overflow-x-auto lg:hidden">
          <div className="min-w-115">
            <div className="grid grid-cols-[minmax(80px,1fr)_0.9fr_0.7fr_1fr] items-center gap-0">
              <div className="sticky left-0 z-10 bg-white py-2 pl-2 sm:py-3 sm:pl-4 md:py-3.5 md:pl-5">
                <span className="text-[8px] font-[PoppinsBold] uppercase tracking-wide text-[#9caf7d] sm:text-2xs md:text-xs">
                  ID & Student
                </span>
              </div>

              <span className="px-1 py-2 text-[8px] font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:py-3 sm:text-2xs md:py-3.5 md:text-xs">
                LRN
              </span>

              <span className="px-1 py-2 text-[8px] font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:py-3 sm:text-2xs md:py-3.5 md:text-xs">
                Gender
              </span>

              <span className="px-1 py-2 text-start text-[8px] font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:py-3 sm:text-2xs md:py-3.5 md:text-xs">
                Attendance
              </span>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="grid grid-cols-[minmax(80px,1fr)_0.9fr_0.7fr_1fr] items-center gap-0 border-t border-gray-100"
                >
                  <div className="sticky left-0 z-10 min-w-0 bg-bone py-2 pl-2 sm:py-3 sm:pl-4 md:py-3.5 md:pl-5">
                    <p className="min-w-0 truncate text-[8px] text-gray-500 sm:text-2xs md:text-xs">
                      {student.schoolId}
                    </p>
                    <p className="min-w-0 truncate text-[8px] font-[Poppins] text-gray-600 sm:text-2xs md:text-xs">
                      {student.fullName}
                    </p>
                  </div>

                  <span className="min-w-0 truncate px-1 py-2 text-[8px] text-slate-600 sm:py-3 sm:text-2xs md:py-3.5 md:text-xs">
                    {student.lrn}
                  </span>

                  <span className="min-w-0 truncate px-1 py-2 text-[8px] text-slate-600 sm:py-3 sm:text-2xs md:py-3.5 md:text-xs">
                    {student.gender}
                  </span>

                  <div className="px-1 py-2 sm:py-3 md:py-3.5">
                    <div className="relative w-fit">
                      <select
                        value={attendance[student.id] || student.attendance || "Present"}
                        onChange={(e) => onAttendanceChange(student.id, e.target.value)}
                        style={(attendance[student.id] || student.attendance || "Present") === "Present" ? { color: "#16a34a" } : { color: "#dc2626" }}
                        className={`h-8 shrink-0 appearance-none rounded-lg border border-gray-200 bg-white py-1 pl-7 pr-7 text-[9px] font-[Poppins] outline-none focus:border-swamp-green sm:h-9 sm:text-2xs md:h-10 md:text-sm ${(attendance[student.id] || student.attendance || "Present") === "Present" ? "text-green-700" : "text-red-700"}`}
                      >
                        {attendanceOptions?.map((option) => (
                          <option key={option.value} value={option.value} style={{ color: option.value === "Present" ? "#16a34a" : "#dc2626" }}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className={`pointer-events-none absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full ${(attendance[student.id] || student.attendance || "Present") === "Present" ? "bg-green-600" : "bg-red-600"}`} />
                      <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Normal table */}
        <div className="hidden lg:block">
          <div className="no-scrollbar min-h-0 flex-1 overflow-auto">
            <div>
              <div
                className="grid items-center gap-2 rounded-xl bg-[#e4e6f0] px-5 py-3 text-left text-xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:gap-3 xl:gap-4 xl:px-6"
                style={{ gridTemplateColumns: `1.2fr 1.5fr 2fr 1fr 1.2fr` }}
              >
                <span>School ID</span>
                <span>LRN</span>
                <span>Full Name</span>
                <span>Gender</span>
                <span>Attendance</span>
              </div>

              <div className="flex flex-col gap-1">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="grid items-center gap-2 rounded-xl border-b border-gray-200 bg-bone px-5 py-2.5 text-left text-xs text-slate-600 last:border-b-0 xl:gap-3 xl:px-6"
                    style={{ gridTemplateColumns: `1.2fr 1.5fr 2fr 1fr 1.2fr` }}
                  >
                    <span className="min-w-0 whitespace-nowrap">{student.schoolId}</span>
                    <span className="min-w-0 whitespace-nowrap">{student.lrn}</span>
                    <span className="min-w-0 truncate">{student.fullName}</span>
                    <span className="min-w-0 whitespace-nowrap">{student.gender}</span>

                    <div className="relative w-fit">
                      <select
                        value={attendance[student.id] || student.attendance || "Present"}
                        onChange={(e) => onAttendanceChange(student.id, e.target.value)}
                        className={`h-9 shrink-0 appearance-none rounded-lg border border-gray-200 bg-white py-1 pl-7 pr-7 text-xs font-[Poppins] outline-none focus:border-swamp-green ${
                          (attendance[student.id] || student.attendance || "Present") === "Present"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-red-200 bg-red-50 text-red-700"
                        }`}
                      >
                        {attendanceOptions?.map((option) => (
                          <option key={option.value} value={option.value} className={option.value === "Absent" ? "text-red-600" : "text-green-600"}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className={`pointer-events-none absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full ${(attendance[student.id] || student.attendance || "Present") === "Present" ? "bg-green-600" : "bg-red-600"}`} />
                      <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AttendanceChecker;
