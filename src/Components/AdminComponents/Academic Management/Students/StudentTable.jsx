import React from "react";

const MOBILE_COLS =
  "grid-cols-[minmax(140px,1.5fr)_minmax(100px,1fr)_minmax(115px,1.2fr)_minmax(85px,0.9fr)_minmax(85px,1fr)_minmax(75px,1fr)]";

const fullName = (student) =>
  `${student.lastName}, ${student.firstName}${
    student.middleName ? ` ${student.middleName.charAt(0)}.` : ""
  }`.trim();

const StudentTable = ({ applicants, onView }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Mobile & Tablet: Sticky scroll (grade report design) */}
      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        {applicants.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-swamp-green/10 bg-white py-10">
            <p className="text-sm text-gray-500">No Students Available</p>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-swamp-green/10 bg-white p-2 shadow-sm sm:p-4 md:p-6">
            <div className="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-auto">
              <div className="min-w-125">
                <div className={`${MOBILE_COLS} sticky top-0 z-30 grid items-center gap-0 bg-white`}>
                  <div className="sticky left-0 top-0 z-40 bg-white py-3 pl-3 pr-2 sm:pl-4 sm:pr-3">
                    <span className="whitespace-nowrap text-2xs font-[PoppinsBold] uppercase tracking-wide text-[#9caf7d] sm:text-xs">
                      No. & Student
                    </span>
                  </div>

                  <span className="sticky whitespace-nowrap px-2 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                    Grade Level
                  </span>

                  <span className="sticky whitespace-nowrap px-2 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                    Section
                  </span>

                  <span className="sticky whitespace-nowrap px-2 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                    Status
                  </span>

                  <span className="sticky whitespace-nowrap px-2 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                    Payment
                  </span>

                  <span className="sticky whitespace-nowrap px-2 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-swamp-green sm:text-xs">
                    Actions
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {applicants.map((applicant, index) => (
                    <div
                      key={applicant.id}
                      className={`${MOBILE_COLS} grid items-center gap-0 border-t border-gray-100`}
                    >
                      <div className="sticky left-0 z-10 min-w-0 bg-bone py-3 pl-3 pr-2 sm:pl-4 sm:pr-3">
                        <p className="min-w-0 truncate text-2xs text-gray-500 sm:text-xs">
                          {index + 1}
                        </p>
                        <p className="min-w-0 truncate text-2xs font-[Poppins] text-gray-600 sm:text-xs">
                          {fullName(applicant)}
                        </p>
                      </div>

                      <span className="min-w-0 truncate px-2 py-3 text-2xs text-slate-600 sm:text-xs">
                        {applicant.gradeLevel}
                      </span>

                      <span className="min-w-0 truncate px-2 py-3 text-2xs text-slate-600 sm:text-xs">
                        {applicant.section}
                      </span>

                      <span className="min-w-0 truncate px-2 py-3 text-2xs text-slate-600 sm:text-xs">
                        {applicant.status}
                      </span>

                      <span className="min-w-0 truncate px-2 py-3 text-2xs text-slate-600 sm:text-xs">
                        {applicant.payment || "—"}
                      </span>

                      <div className="flex justify-start py-3 -ml-1">
                        <button
                          type="button"
                          onClick={() => onView(applicant)}
                          className="rounded-full bg-[#9caf7d] px-4 py-1.5 text-2xs font-[PoppinsBold] text-white transition hover:opacity-90 sm:px-5 sm:py-2 sm:text-xs"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Original table */}
      <div className="hidden flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm lg:flex">
        <div className="flex flex-1 flex-col overflow-x-auto overflow-y-auto min-h-0 thin-scrollbar">
          <table className="w-full min-w-176 border-separate border-spacing-0">
            <thead className="sticky top-0">
              <tr className="bg-bone">
                {[
                  "NO.",
                  "LAST NAME",
                  "FIRST NAME",
                  "GRADE LEVEL",
                  "SECTION",
                  "STATUS",
                ].map((column) => (
                  <th
                    key={column}
                    className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:px-2 lg:text-[11px] xl:px-6 xl:text-sm"
                  >
                    {column}
                  </th>
                ))}

                <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:px-2 lg:text-[11px] xl:px-6 xl:text-sm">
                  PAYMENT
                </th>

                <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:px-2 lg:text-[11px] xl:px-6 xl:text-sm">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className="border-b border-gray-200 text-2xs text-gray-600 last:border-b-0 sm:text-[11px] lg:text-xs xl:text-sm"
                >
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">{index + 1}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">{applicant.lastName}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">{applicant.firstName}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">{applicant.gradeLevel}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">{applicant.section}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">{applicant.status}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">
                    {applicant.payment || "—"}
                  </td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5 lg:px-2 xl:px-6">
                    <button
                      onClick={() => onView(applicant)}
                      className="rounded-xl border border-gray-400 px-3.5 py-1 text-[11px] text-white bg-swamp-green lg:text-xs xl:text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {applicants.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
              <p className="text-sm text-gray-500">
                No Students Available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentTable;