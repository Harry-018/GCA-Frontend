import React, { useMemo, useState } from "react";

const PromoteStudentModal = ({
  isOpen,
  onClose,
  onSave,
  students = [],
  gradeLevels = [],
  promotionOptions = [],
}) => {
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [studentStatuses, setStudentStatuses] = useState({});

  const filteredStudents = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        !keyword ||
        [
          student.studentNo,
          student.lastName,
          student.firstName,
        ].some((value) =>
          String(value).toLowerCase().includes(keyword)
        );

      const matchesGrade =
        !selectedGrade ||
        student.gradeLevel === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [students, search, selectedGrade]);

  const handleStatusChange = (studentNo, status) => {
    setStudentStatuses((current) => ({
      ...current,
      [studentNo]: status,
    }));
  };

  const handleSave = () => {
    const updatedStudents = students
      .filter((student) => studentStatuses[student.studentNo])
      .map((student) => ({
        ...student,
        status: studentStatuses[student.studentNo],
      }));

    onSave?.(updatedStudents);

    setStudentStatuses({});
    setSearch("");
    setSelectedGrade("");
  };

  const handleClose = () => {
    setStudentStatuses({});
    setSearch("");
    setSelectedGrade("");
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
            Promote Students
          </h2>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-[Poppins] text-xs text-gray-600">
              Select Students.
            </p>

            {/* Filters */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                value={selectedGrade}
                onChange={(event) =>
                  setSelectedGrade(event.target.value)
                }
                className="w-full rounded-full border border-gray-400 bg-transparent px-4 py-2 font-[Poppins] text-xs text-gray-600 outline-none sm:w-40"
              >
                <option value="">
                  Select Grade Level
                </option>

                {gradeLevels.map((level) => (
                  <option
                    key={level.value ?? level}
                    value={level.value ?? level}
                  >
                    {level.label ?? level}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search Student"
                className="w-full rounded-full border border-gray-400 bg-transparent px-4 py-2 font-[Poppins] text-xs outline-none placeholder:text-gray-500 sm:w-40"
              />

              <button
                type="button"
                className="rounded-full bg-[#9caf7c] px-5 py-2 font-[PoppinsBold] text-xs text-white transition hover:opacity-90"
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

                      <td className="px-4 py-2.5">
                        <select
                          value={
                            studentStatuses[student.studentNo] || ""
                          }
                          onChange={(event) =>
                            handleStatusChange(
                              student.studentNo,
                              event.target.value
                            )
                          }
                          className="w-full min-w-24 cursor-pointer rounded-full border border-gray-400 bg-transparent px-3 py-1.5 font-[Poppins] text-xs text-gray-600 outline-none"
                        >
                          <option value="" disabled>
                            Select Status
                          </option>

                          {promotionOptions.map((option) => (
                            <option
                              key={option.value ?? option}
                              value={option.value ?? option}
                            >
                              {option.label ?? option}
                            </option>
                          ))}
                        </select>
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

        {/* Footer */}
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
            onClick={handleSave}
            className="w-full rounded-full bg-[#9caf7c] px-12 py-2 font-[PoppinsBold] text-xs text-white transition hover:opacity-90 sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoteStudentModal;