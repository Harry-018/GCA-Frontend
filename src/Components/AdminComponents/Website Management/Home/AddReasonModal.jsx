import React from "react";

const AddReasonModal = ({
  isOpen,
  reason = "",
  onChange,
  onClose,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green">
          Add Reason
        </h2>

        {/* Reason */}
        <div className="flex flex-col gap-1.5 pt-5">
          <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
            Reason:
          </label>

          <textarea
            value={reason}
            onChange={(e) => onChange?.(e.target.value)}
            rows={3}
            placeholder="Type the reason here..."
            className="w-full resize-none rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] sm:text-xs font-semibold text-[#555555] transition hover:bg-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onAdd}
            className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] sm:text-xs font-semibold text-white transition hover:bg-lime-green"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReasonModal;