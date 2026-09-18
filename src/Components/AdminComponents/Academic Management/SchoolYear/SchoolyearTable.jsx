import React from "react";

const SchoolyearTable = ({ schoolYears = [], onEdit }) => {
  const columns = [
    "NO.",
    "School Year",
    "Start",
    "End",
    "STATUS",
    "ENROLLMENT",
    "CREATED",
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col overflow-x-auto overflow-y-auto thin-scrollbar">
          <table className="w-full min-w-176 border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-bone">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base"
                  >
                    {column}
                  </th>
                ))}

                <th className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {schoolYears.map((schoolYear, index) => (
                <tr
                  key={schoolYear.id || schoolYear.schoolYear}
                  className="border-b border-gray-200 text-2xs text-gray-600 last:border-b-0 sm:text-[11px] lg:text-xs xl:text-sm"
                >
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{index + 1}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schoolYear.schoolYear}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schoolYear.start}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schoolYear.end}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schoolYear.status}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schoolYear.enrollment}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">{schoolYear.created}</td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                    <button
                      type="button"
                      onClick={() => onEdit?.(schoolYear)}
                      className="rounded-xl border border-gray-400 bg-swamp-green px-3.5 py-1 text-[11px] text-white transition hover:opacity-80 lg:text-xs xl:text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {schoolYears.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
              <p className="text-sm text-gray-500">
                No school years found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolyearTable;