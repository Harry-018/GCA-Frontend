import React from "react";

const ParentsTable = ({ parents, columns }) => {
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
              </tr>
            </thead>

            <tbody>
              {parents.map((parent, index) => (
                <tr
                  key={parent.id}
                  className="border-b border-gray-200 text-[11px] text-gray-600 last:border-b-0 lg:text-xs xl:text-sm"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-2.5"
                    >
                      {column.key === "no"
                        ? index + 1
                        : parent[column.key] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {parents.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
              <p className="text-sm text-gray-500">
                No Parents Available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentsTable;