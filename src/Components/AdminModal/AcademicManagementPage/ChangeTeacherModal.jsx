import React, { useEffect, useState } from "react";

const ChangeTeacherModal = ({
  teachers = [],
  currentTeacherId,
  onCancel,
  onChange,
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  useEffect(() => {
    if (currentTeacherId) {
      setSelectedTeacherId(String(currentTeacherId));
    } else {
      setSelectedTeacherId("");
    }
  }, [currentTeacherId]);

  const handleChange = () => {
    if (!selectedTeacherId) return;

    onChange(Number(selectedTeacherId));
  };

  const getTeacherName = (teacher) => {
    return [teacher.first_name, teacher.middle_name, teacher.last_name]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-5">
      <div className="w-full max-w-sm rounded-2xl bg-[#f8f9ff] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Change Teacher
        </h2>

        <div className="flex flex-col gap-y-2 py-4">
          <label className="font-[Poppins] text-xs text-gray-700">
            Select Teacher:
          </label>

          <select
            value={selectedTeacherId}
            onChange={(event) => setSelectedTeacherId(event.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 font-[Poppins] text-xs text-gray-500 outline-none focus:border-swamp-green"
          >
            <option value="">Select teacher</option>

            {teachers.map((teacher) => (
              <option key={teacher.teacher_id} value={teacher.teacher_id}>
                {getTeacherName(teacher)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-x-2 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 flex-1 rounded-full border border-gray-300 bg-transparent font-[PoppinsBold] text-xs text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedTeacherId}
            onClick={handleChange}
            className="h-10 flex-1 rounded-full bg-[#9caf7c] font-[PoppinsBold] text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeTeacherModal;
