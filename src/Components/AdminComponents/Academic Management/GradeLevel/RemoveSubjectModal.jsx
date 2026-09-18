import React from "react";

const RemoveSubjectModal = ({
  isOpen,
  subjectName,
  onCancel,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#f8f9ff] p-6 shadow-lg">
        <h2 className="font-[Poppins] text-sm font-semibold text-[#ff7777]">
          Remove Subject
        </h2>

        {/* Message */}
        <p className="pt-4 font-[Poppins] text-xs leading-relaxed text-gray-600">
          Clicking "Remove" will remove this subject and its information,
          such as the subject name and its skills.
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 font-[Poppins] text-xs text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="flex-1 rounded-full bg-[#ff7777] px-4 py-2 font-[Poppins] text-xs font-semibold text-white"
            title={subjectName}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSubjectModal;