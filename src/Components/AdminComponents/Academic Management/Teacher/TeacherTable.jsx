import React from "react";

const TeacherTable = ({ teachers, loading, onView, onEdit }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-xs">
        <thead className="bg-[#f7f7ff]">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left font-medium">Teacher No.</th>

            <th className="px-4 py-3 text-left font-medium">Name</th>

            <th className="px-4 py-3 text-left font-medium">Gender</th>

            <th className="px-4 py-3 text-left font-medium">Contact</th>

            <th className="px-4 py-3 text-left font-medium">Email</th>

            <th className="px-4 py-3 text-left font-medium">Status</th>

            <th className="px-4 py-3 text-center font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                Loading teachers...
              </td>
            </tr>
          ) : teachers.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                No teachers found.
              </td>
            </tr>
          ) : (
            teachers.map((teacher) => (
              <tr
                key={teacher.teacher_id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3">{teacher.teacher_num || "—"}</td>

                <td className="px-4 py-3 font-medium">
                  {teacher.last_name}, {teacher.first_name}{" "}
                  {teacher.middle_name || ""}
                </td>

                <td className="px-4 py-3">{teacher.gender || "—"}</td>

                <td className="px-4 py-3">{teacher.contact_num || "—"}</td>

                <td className="px-4 py-3">{teacher.email || "—"}</td>

                <td className="px-4 py-3">{teacher.teacher_status}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(teacher.teacher_id)}
                      className="rounded-md border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-100"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(teacher.teacher_id)}
                      className="rounded-md bg-swamp-green px-3 py-1 text-[11px] text-white hover:opacity-90"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
