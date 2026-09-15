import React from "react";

const DEFAULT_COLUMNS = [
  { key: "schoolId", label: "School ID" },
  { key: "lrn", label: "LRN" },
  { key: "fullName", label: "Full Name" },
  { key: "gender", label: "Gender" },
  { key: "birthdate", label: "Birthdate" },
  { key: "age", label: "Age", align: "center" },
];

const StudentTable = ({ students, columns = DEFAULT_COLUMNS }) => {
  const colCount = columns.length;

  return (
    <div className="rounded-3xl border border-swamp-green/10 bg-white p-2 shadow-sm sm:p-4 md:p-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="flex flex-col gap-2 lg:min-h-0 lg:flex-1">

        {/* Mobile & Tablet: Sticky scroll */}
        <div className="no-scrollbar overflow-x-auto lg:hidden">
          <div className="min-w-150">

            {/* Header */}
            <div className="grid grid-cols-[minmax(110px,1.2fr)_repeat(4,1fr)] items-center gap-0">
              <div className="sticky left-0 z-10 bg-white py-3 pl-3 sm:pl-4">
                <span className="text-2xs font-[PoppinsBold] uppercase tracking-wide text-[#9caf7d] sm:text-xs">
                  ID & Student
                </span>
              </div>

              {columns.filter((col) => col.key !== "fullName").slice(1).map((col) => (
                <span
                  key={col.key}
                  className={`px-2 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs ${col.align === "center" ? "text-center" : ""}`}
                >
                  {col.label}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-2">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="grid grid-cols-[minmax(110px,1.2fr)_repeat(4,1fr)] items-center gap-0 border-t border-gray-100"
                >
                  <div className="sticky left-0 z-10 min-w-0 bg-bone py-3 pl-3 sm:pl-4">
                    <p className="min-w-0 truncate text-2xs text-gray-500 sm:text-xs">
                      {student.schoolId}
                    </p>
                    <p className="min-w-0 truncate text-2xs font-[Poppins] text-gray-600 sm:text-xs">
                      {student.fullName}
                    </p>
                  </div>

                  {columns.filter((col) => col.key !== "fullName").slice(1).map((col) => (
                    <span
                      key={col.key}
                      className={`min-w-0 truncate px-2 py-3 text-2xs text-slate-600 sm:text-xs ${col.align === "center" ? "text-center" : ""}`}
                    >
                      {student[col.key]}
                    </span>
                  ))}
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
                className="grid items-center gap-4 rounded-xl bg-[#e4e6f0] px-5 py-3 text-left text-xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green xl:gap-6 xl:px-6"
                style={{ gridTemplateColumns: `1fr 1.5fr 2fr 1fr 1.2fr 0.5fr` }}
              >
                {columns.map((col) => (
                  <span key={col.key} className={col.align === "center" ? "text-center" : ""}>
                    {col.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="grid items-center gap-4 rounded-xl border-b border-gray-200 bg-bone px-5 py-3 text-left text-xs text-slate-600 last:border-b-0 xl:gap-6 xl:px-6"
                    style={{ gridTemplateColumns: `1fr 1.5fr 2fr 1fr 1.2fr 0.5fr` }}
                  >
                    {columns.map((col) => (
                      <span key={col.key} className={`min-w-0 truncate ${col.align === "center" ? "text-center" : ""}`}>
                        {student[col.key]}
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
}

export default StudentTable;
