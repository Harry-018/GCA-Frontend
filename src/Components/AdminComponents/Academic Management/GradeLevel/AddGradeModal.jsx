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
      <div className="w-full max-w-md rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-parent-green">
          Add Grade Level
        </h2>

        <div className="flex flex-col gap-1 pt-4">
          <label className="text-2xs text-gray-600">Grade Level:</label>

          <select
            value={selectedGradeLevel}
            onChange={onChange}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-parent-accent/25 bg-bone px-2 py-1.5 text-2xs text-gray-600 outline-none focus:border-parent-green disabled:cursor-not-allowed disabled:opacity-50"
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
            className="w-1/2 rounded-full border border-parent-accent/25 py-1.5 text-xs font-[PoppinsBold] text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onAdd}
            disabled={!selectedGradeLevel || isSubmitting}
            className="w-1/2 rounded-full bg-parent-green py-1.5 text-xs font-[PoppinsBold] text-white hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGradeLevelModal;
