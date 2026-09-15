import React from "react";

const DEFAULT_COLUMNS = [
  { key: "lrn", label: "LRN" },
  { key: "lastName", label: "Last Name" },
  { key: "firstName", label: "First Name" },
  { key: "gender", label: "Gender" },
  { key: "age", label: "Age" },
];

const ClassInfoTable = ({
  students = [],
  columns = DEFAULT_COLUMNS,
  onRemove,
}) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto thin-scrollbar">
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 border-collapse">
          <thead className="sticky top-0">
            <tr className="bg-bone text-left text-xs font-[PoppinsBold] uppercase text-swamp-green lg:text-sm xl:text-base">
              <th className="px-6 py-4">No.</th>

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left"
                >
                  {column.label}
                </th>
              ))}

              {onRemove && (
                <th className="px-6 py-4 text-center">Action</th>
              )}
            </tr>
          </thead>

          <tbody className="text-xs text-gray-600 lg:text-sm xl:text-base">
            {students.map((student, index) => (
              <tr
                key={student.id ?? index}
                className={`border-b border-gray-200 last:border-b-0 ${
                  index % 2 === 0 ? "bg-white" : "bg-bone"
                }`}
              >
                <td className="px-6 py-3">{index + 1}</td>

                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-3">
                    {student[column.key] ?? "—"}
                  </td>
                ))}

                {onRemove && (
                  <td className="px-6 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => onRemove(student)}
                      className="rounded-full bg-[#ff7777] px-4 py-1.5 font-[PoppinsBold] text-2xs text-white transition hover:opacity-80"
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (onRemove ? 2 : 1)}
                  className="px-6 py-12 text-center text-sm text-gray-400"
                >
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassInfoTable;