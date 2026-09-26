import React from "react";

const SkillsTable = ({ subjects = [], onEdit, onRemove }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
      <div className="flex min-h-0 flex-1 flex-col overflow-x-auto overflow-y-auto thin-scrollbar">
        <table className="w-full min-w-md border-separate border-spacing-0">
          <thead className="sticky top-0">
            <tr className="text-left text-[11px] font-[PoppinsBold] uppercase text-swamp-green sm:text-xs lg:text-sm xl:text-base">
              <th className="bg-white px-3 py-4 sm:px-6">No.</th>
              <th className="bg-white px-3 py-4 sm:px-6">Skills</th>
              <th className="bg-white px-3 py-4 sm:px-6">Description</th>
              <th className="bg-white px-3 py-4 sm:px-6">Action</th>
            </tr>
          </thead>
          20
          <tbody className="text-2xs text-gray-600 sm:text-xs lg:text-sm xl:text-base">
            {subjects.map((subject, index) => (
              <tr
                key={subject.id || index}
                className={`border-b border-gray-200 last:border-b-0 ${
                  index % 2 === 0 ? "bg-white" : "bg-bone"
                }`}
              >
                <td className="px-3 py-3 sm:px-6">{index + 1}</td>

                <td className="px-3 py-3 sm:px-6">{subject.skills}</td>

                <td className="px-3 py-3 sm:px-6">
                  {subject.description || "No Description"}
                </td>

                <td className="px-3 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(subject)}
                      className="rounded-xl border border-gray-400 bg-swamp-green px-3.5 py-1 text-2xs text-white transition hover:opacity-80 sm:text-[11px] lg:text-xs xl:text-sm"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemove(subject)}
                      className="rounded-xl bg-[#ff7272] px-3.5 py-1 text-2xs text-white transition hover:bg-[#f45f5f] sm:text-[11px] lg:text-xs xl:text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {subjects.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-12 text-center text-sm text-gray-400 sm:px-6"
                >
                  No skills available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillsTable;
