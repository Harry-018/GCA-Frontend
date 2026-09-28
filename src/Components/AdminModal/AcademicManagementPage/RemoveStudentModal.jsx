import React from "react";

const RemoveStudentModal = ({
  isOpen,
  student,
  onCancel,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen) return null;

  const studentName =
    student?.name ||
    [student?.first_name, student?.middle_name, student?.last_name]
      .filter(Boolean)
      .join(" ") ||
    "this student";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-bone shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="font-[PoppinsBold] text-base text-gray-700">
              Remove Student
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-sm text-gray-600">
            Are you sure you want to remove{" "}
            <span className="font-semibold text-gray-800">{studentName}</span>{" "}
            from this section?
          </p>

          <p className="mt-2 text-xs text-gray-500">
            The student will remain enrolled in the school but will no longer be
            assigned to this section.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-full border border-gray-300 px-5 py-2 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-full bg-reject px-5 py-2 text-xs text-white hover:bg-reject/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Removing..." : "Remove Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveStudentModal;
