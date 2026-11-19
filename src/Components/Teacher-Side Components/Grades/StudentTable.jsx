import React from "react";

const StudentTable = ({ students, columns, onViewClick }) => {
  return (
    <div className="flex w-full min-w-0 flex-col overflow-auto rounded-2xl border border-parent-green/10 bg-bone shadow-sm lg:min-h-0 lg:flex-1">
      <table className="w-full min-w-160 text-left text-sm">
        <thead className="sticky top-0 z-10 bg-bone">
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-3 py-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-gray-700 sm:px-4 sm:text-xs"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student.schoolId}
                className="border-b border-gray-100 transition-colors duration-200 last:border-0 hover:bg-parent-pale/30"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-3 py-2.5 text-xs text-gray-700 sm:px-4 sm:text-sm"
                  >
                    {column.key === "actions" ? (
                      <button
                        type="button"
                        onClick={() => onViewClick(student)}
                        className="cursor-pointer rounded-full bg-parent-green px-4 py-1.5 text-2xs font-[PoppinsBold] text-white transition hover:bg-parent-accent sm:px-5 sm:text-xs"
                      >
                        View
                      </button>
                    ) : (
                      <span className="block break-words">
                        {student[column.key] ?? "—"}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
