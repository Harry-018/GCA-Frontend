import React from "react";

const StudentTable = ({ applicants, columns, onView }) => {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
        <div className="flex flex-1 flex-col overflow-y-auto min-h-0 thin-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-bone">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-5 text-left text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base"
                  >
                    {column.label}
                  </th>
                ))}

                <th className="px-6 py-5 text-left text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base">
                  PAYMENT
                </th>

                <th className="px-6 py-5 text-left text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className="border-b border-gray-200 text-[11px] text-gray-600 last:border-b-0 lg:text-xs xl:text-sm"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-2.5"
                    >
                      {column.key === "no"
                        ? index + 1
                        : applicant[column.key]}
                    </td>
                  ))}

                  <td className="px-6 py-2.5">
                    {applicant.payment || "—"}
                  </td>

                  <td className="px-6 py-2.5">
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