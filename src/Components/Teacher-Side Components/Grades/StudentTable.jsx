import React from "react";

const StudentTable = ({ students, columns, onGradesClick }) => {
  const colCount = columns.length;

  return (
    <div className="rounded-3xl border border-swamp-green/10 bg-white p-2 shadow-sm sm:p-4 md:p-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="flex flex-col gap-2 lg:min-h-0 lg:flex-1">

        {/* Mobile & Tablet: Sticky scroll */}
        <div className="no-scrollbar overflow-x-auto lg:hidden">
          <div className="min-w-125">
            <div className="grid grid-cols-[minmax(100px,1.2fr)_1fr_0.8fr_0.7fr] items-center gap-0">
              <div className="sticky left-0 z-10 bg-white py-3 pl-3 sm:pl-4">
                <span className="text-2xs font-[PoppinsBold] uppercase tracking-wide text-[#9caf7d] sm:text-xs">
                  ID & Student
                </span>
              </div>

              <span className="px-1 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                LRN
              </span>

              <span className="px-1 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                Gender
              </span>

              <span className="px-1 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                Actions
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {students.map((student) => (
                <div
                  key={student.schoolId}
                  className="grid grid-cols-[minmax(100px,1.2fr)_1fr_0.8fr_0.7fr] items-center gap-0 border-t border-gray-100"
                >
                  <div className="sticky left-0 z-10 min-w-0 bg-bone py-3 pl-3 sm:pl-4">
                    <p className="min-w-0 truncate text-2xs text-gray-500 sm:text-xs">
                      {student.schoolId}
                    </p>
                    <p className="min-w-0 truncate text-2xs font-[Poppins] text-gray-600 sm:text-xs">
                      {student.name}
                    </p>
                  </div>

                  <span className="min-w-0 truncate px-1 py-3 text-2xs text-slate-600 sm:text-xs">
                    {student.lrn}
                  </span>

                  <span className="min-w-0 truncate px-1 py-3 text-2xs text-slate-600 sm:text-xs">
                    {student.gender}
                  </span>

                  <div className="flex justify-start py-3 -ml-1">
                    <button
                      type="button"
                      onClick={() => onGradesClick(student)}
                      className="rounded-full bg-[#9caf7d] px-4 py-1.5 text-2xs font-[PoppinsBold] text-white transition hover:opacity-90 sm:px-5 sm:py-2 sm:text-xs"
                    >
                      Grades
                    </button>
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
                {columns.map((col) => (
                  <span key={col.key}>{col.label}</span>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                {students.map((student) => (
                  <div
                    key={student.schoolId}
                    className="grid items-center gap-2 rounded-xl border-b border-gray-200 bg-bone px-5 py-2.5 text-left text-xs text-slate-600 last:border-b-0 sm:gap-3 xl:gap-4 xl:px-6"
                    style={{ gridTemplateColumns: `1.2fr 1.5fr 2fr 1fr 1.2fr` }}
                  >
                    {columns.map((col) => (
                      <span key={col.key} className="min-w-0 truncate">
                        {col.key === "actions" ? (
                          <button
                            type="button"
                            onClick={() => onGradesClick(student)}
                            className="rounded-full bg-[#9caf7d] px-5 py-2 text-xs font-[PoppinsBold] text-white transition hover:opacity-90"
                          >
                            Grades
                          </button>
                        ) : (
                          student[col.key]
                        )}
                      </span>
                    ))}
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

export default StudentTable;
