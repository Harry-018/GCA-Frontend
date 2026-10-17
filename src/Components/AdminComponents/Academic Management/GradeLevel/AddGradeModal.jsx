import React from "react";

const AddGradeLevelModal = ({
  isOpen,
  gradeLevels = [],
  selectedGradeLevel,
  onChange,
  onCancel,
  onAdd,
  isSubmitting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Add Grade Level
        </h2>

        <div className="flex flex-col gap-1 pt-4">
          <label className="text-2xs text-gray-600">Grade Level:</label>

          <select
            value={selectedGradeLevel}
            onChange={onChange}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-2xs text-gray-600 outline-none focus:border-[#91a77a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select Grade Level</option>

            {gradeLevels.map((grade) => (
              <option key={grade.grade_level_id} value={grade.grade_level_id}>
                {grade.grade_level_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-1/2 rounded-full border border-gray-300 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onAdd}
            disabled={!selectedGradeLevel || isSubmitting}
            className="w-1/2 rounded-full bg-swamp-green py-1.5 text-xs font-semibold text-white hover:bg-[#7d9367] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGradeLevelModal;
