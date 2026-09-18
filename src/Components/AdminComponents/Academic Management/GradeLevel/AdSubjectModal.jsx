import React from "react";

const AddSubjectModal = ({
  isOpen,
  subjectName,
  onChange,
  onCancel,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#f8f9ff] p-6 shadow-lg">
        <h2 className="font-[Poppins] text-base text-swamp-green">
          Add Subject
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
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-sm outline-none focus:border-swamp-green"
          />
        </div>

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
            onClick={onAdd}
            className="flex-1 rounded-full bg-swamp-green px-4 py-2 font-[Poppins] text-xs text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;