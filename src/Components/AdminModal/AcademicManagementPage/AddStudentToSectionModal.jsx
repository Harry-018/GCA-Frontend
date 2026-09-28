import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { searchStudentsForSection } from "../../../requests/sectionsRequests.js";

const AddStudentToSectionModal = ({ isOpen, onClose, sectionId, onAdd }) => {
  const [searchValue, setSearchValue] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadStudents = async (search = "") => {
    if (!sectionId) return;

    try {
      setLoading(true);

      const result = await searchStudentsForSection(Number(sectionId), search);

      setStudents(result.data || []);
    } catch (error) {
      console.error("Failed to search students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    setSearchValue("");
    setSelectedStudentIds([]);

    loadStudents("");
  }, [isOpen, sectionId]);

  if (!isOpen) return null;

  const toggleStudent = (stu_id) => {
    setSelectedStudentIds((current) =>
      current.includes(stu_id)
        ? current.filter((id) => id !== stu_id)
        : [...current, stu_id],
    );
  };

  const handleSearch = () => {
    loadStudents(searchValue);
  };

  const handleAdd = async () => {
    if (selectedStudentIds.length === 0) return;

    await onAdd(selectedStudentIds);

    setSelectedStudentIds([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-bone shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="font-[PoppinsBold] text-base text-swamp-green">
              Add Students
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Select students to add to this section.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-2 border-b border-gray-200 p-4">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search student..."
              className="h-9 w-full rounded-full border border-gray-300 bg-white pl-9 pr-4 text-xs text-gray-600 outline-none focus:border-swamp-green"
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="rounded-full bg-swamp-green px-5 text-xs text-white hover:bg-[#899d6d]"
          >
            Search
          </button>
        </div>

        {/* Student list */}
        <div className="min-h-0 flex-1 overflow-auto p-4">
          {loading ? (
            <p className="py-10 text-center text-xs text-gray-500">
              Loading students...
            </p>
          ) : students.length === 0 ? (
            <p className="py-10 text-center text-xs text-gray-500">
              No eligible students found.
            </p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-gray-200 bg-bone">
                  <tr>
                    <th className="w-12 px-4 py-3"></th>
                    <th className="px-4 py-3 font-semibold text-gray-500">
                      Student Number
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-500">
                      Name
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-500">
                      LRN
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => {
                    const selected = selectedStudentIds.includes(
                      student.stu_id,
                    );

                    return (
                      <tr
                        key={student.stu_id}
                        onClick={() => toggleStudent(student.stu_id)}
                        className={`cursor-pointer border-b border-gray-100 last:border-0 ${
                          selected ? "bg-bg-gray-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleStudent(student.stu_id)}
                            onClick={(event) => event.stopPropagation()}
                            className="h-4 w-4 accent-[#9caf7e]"
                          />
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {student.stu_num}
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {[
                            student.first_name,
                            student.middle_name,
                            student.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {student.lrn || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <span className="text-xs text-gray-500">
            {selectedStudentIds.length} student
            {selectedStudentIds.length !== 1 ? "s" : ""} selected
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 px-5 py-2 text-xs text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={selectedStudentIds.length === 0}
              onClick={handleAdd}
              className="rounded-full bg-swamp-green px-5 py-2 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddStudentToSectionModal;
