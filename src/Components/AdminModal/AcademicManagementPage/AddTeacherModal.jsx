import React from "react";

const AddTeacherModal = ({
  email,
  onChange,
  onCancel,
  onSend,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-[#f4f6ff] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Add Teacher
        </h2>

        {/* Description */}
        <p className="py-2 text-[11px] text-gray-600">
          Enter the email of the teacher to be added
        </p>

        {/* Email */}
        <div className="flex flex-col gap-y-1 py-4">
          <label
            htmlFor="teacher-email"
            className="text-[11px] font-[PoppinsBold] text-gray-600"
          >
            Email: <span className="text-red-500">*</span>
          </label>

          <input
            id="teacher-email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="h-7 w-full rounded-lg border border-gray-400 bg-white px-3 text-[11px] text-gray-600 outline-none focus:border-swamp-green"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 flex-1 items-center justify-center rounded-full border border-gray-400 bg-white font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSend}
            className="flex h-8 flex-1 items-center justify-center rounded-full bg-[#9caf7d] font-[PoppinsBold] text-xs text-white transition hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal;