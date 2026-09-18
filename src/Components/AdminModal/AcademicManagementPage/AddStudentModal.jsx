import React, { useMemo, useState } from "react";

const AddStudentModal = ({
  isOpen,
  onClose,
  onAdd,
  students = [],
}) => {
  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const filteredStudents = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return students;
    }

    return students.filter((student) =>
      [
        student.studentNo,
        student.lastName,
        student.firstName,
      ].some((value) =>
        String(value).toLowerCase().includes(keyword)
      )
    );
  }, [students, search]);

  const handleSelect = (studentNo) => {
    setSelectedStudents((current) =>
      current.includes(studentNo)
        ? current.filter((id) => id !== studentNo)
        : [...current, studentNo]
    );
  };

  const handleAdd = () => {
    const selected = students.filter((student) =>
      selectedStudents.includes(student.studentNo)
    );

    onAdd?.(selected);

    setSelectedStudents([]);
    setSearch("");
  };

  const handleClose = () => {
    setSelectedStudents([]);
    setSearch("");
    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-5">
      <div className="flex w-full max-w-2xl flex-col gap-y-5 rounded-3xl border border-gray-300 bg-[#f7f8ff] p-5 shadow-lg">
        <div className="flex flex-col gap-y-2">
          <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
            Add Student
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-[Poppins] text-xs text-gray-600">
              Select Students.
            </p>

            {/* Search */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Student"
                className="w-full rounded-full border border-gray-400 bg-transparent px-4 py-2 font-[Poppins] text-xs outline-none placeholder:text-gray-500 sm:w-40"
              />

              <button
                type="button"
                className="rounded-full bg-swamp-green px-5 py-2 font-[PoppinsBold] text-xs text-white transition hover:opacity-90"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-300">
          <div className="max-h-72 overflow-auto">
            <table className="w-full min-w-120 border-collapse">
              <thead className="sticky top-0 bg-[#f7f8ff]">
                <tr className="font-[PoppinsBold] text-xs text-swamp-green">
                  <th className="px-4 py-3 text-left">
                    Student No.
                  </th>

                  <th className="px-4 py-3 text-left">
                    LAST NAME
                  </th>

                  <th className="px-4 py-3 text-left">
                    FIRST NAME
                  </th>

                  <th className="px-4 py-3 text-center">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.studentNo}
                      className="font-[Poppins] text-xs text-gray-600"
                    >
                      <td className="px-4 py-2.5">
                        {student.studentNo}
                      </td>

                      <td className="px-4 py-2.5">
                        {student.lastName}
                      </td>

                      <td className="px-4 py-2.5">
                        {student.firstName}
                      </td>

                      <td className="px-4 py-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(
                            student.studentNo
                          )}
                          onChange={() =>
                            handleSelect(student.studentNo)
                          }
                          className="h-5 w-5 cursor-pointer appearance-none rounded border border-gray-400 bg-transparent checked:bg-swamp-green"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center font-[Poppins] text-xs text-gray-500"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-full border border-gray-400 bg-transparent px-10 py-2 font-[PoppinsBold] text-xs text-gray-600 transition hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={selectedStudents.length === 0}
            className="w-full rounded-full bg-swamp-green px-12 py-2 font-[PoppinsBold] text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;