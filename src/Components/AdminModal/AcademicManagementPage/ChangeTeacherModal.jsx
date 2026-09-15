import React, { useState } from "react";

const ChangeTeacherModal = ({
  teachers = ["Rosaline Rosamanta"],
  onCancel,
  onChange,
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0] || "");

  const handleChange = () => {
    if (onChange) {
      onChange(selectedTeacher);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-5">
      <div className="w-full max-w-sm rounded-2xl bg-[#f8f9ff] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Change Teacher
        </h2>

        {/* Select Teacher */}
        <div className="flex flex-col gap-y-2 py-4">
          <label className="font-[Poppins] text-xs text-gray-700">
            Select Teacher:
          </label>

          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 font-[Poppins] text-xs text-gray-500 outline-none focus:border-swamp-green"
          >
            {teachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
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
            onClick={handleChange}
            className="h-10 flex-1 rounded-full bg-[#9caf7c] font-[PoppinsBold] text-xs text-white transition hover:opacity-90"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeTeacherModal;