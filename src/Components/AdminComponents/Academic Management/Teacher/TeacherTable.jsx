import React from "react";

const TeacherTable = ({ teachers, columns, onEdit }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto thin-scrollbar">
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
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((teacher, index) => (
                <tr
                  key={teacher.id}
                  className="border-b border-gray-200 text-[11px] text-gray-600 last:border-b-0 lg:text-xs xl:text-sm"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-2.5"
                    >
                      {column.key === "no"
                        ? index + 1
                        : teacher[column.key]}
                    </td>
                  ))}

                  <td className="px-6 py-2.5">
                    <button
                      type="button"
                      onClick={() => onEdit(teacher)}
                      className="rounded-xl border border-gray-400 px-3.5 py-1 text-[11px] text-white bg-swamp-green lg:text-xs xl:text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {teachers.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
              <p className="text-sm text-gray-500">
                No Teachers Available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherTable;