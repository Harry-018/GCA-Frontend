import React from "react";

const RenameSubjectModal = ({
  isOpen,
  subjectName,
  onChange,
  onCancel,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-linear-to-br from-bone via-white to-parent-pale/60 p-6 shadow-lg">
        <h2 className="font-[Poppins] text-base text-parent-green">
          Rename Subject
        </h2>

        {/* Input */}
        <div className="flex flex-col gap-1 pt-7">
          <label className="font-[Poppins] text-xs text-gray-600">
            Subject Name:
          </label>

          <input
            type="text"
            value={subjectName}
            onChange={onChange}
            className="h-8 w-full rounded-lg border border-parent-accent/25 bg-bone px-2.5 font-[Poppins] text-sm text-gray-600 outline-none focus:border-parent-green"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-parent-accent/25 px-4 py-2 font-[Poppins] text-xs text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="flex-1 rounded-full bg-parent-green px-4 py-2 font-[Poppins] text-xs text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameSubjectModal;
