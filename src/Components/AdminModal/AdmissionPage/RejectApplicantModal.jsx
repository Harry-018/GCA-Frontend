import React from "react";
import { X } from "lucide-react";

const RejectApplicantModal = ({
  isOpen,
  onClose,
  onReject,
  reasons = [],
  selectedReason,
  onReasonChange,
  customReason = "",
  onCustomReasonChange,
  title = "Reject Applicant",
}) => {
  if (!isOpen) return null;

  const canReject =
    Boolean(selectedReason) &&
    (selectedReason !== "other" || Boolean(customReason.trim()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#f5f6fd] px-6 py-5 shadow-lg">

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h2 className="text-base font-bold text-[#f47773]">
          {title}
        </h2>

        <div className="flex items-center gap-4 py-5">
          <label className="w-20 shrink-0 text-xs text-gray-600">
            Select Reason:
          </label>

          <select
            value={selectedReason}
            onChange={(e) => onReasonChange(e.target.value)}
            className="h-10 flex-1 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-500 outline-none focus:border-[#f47773]"
          >
            <option value="">Select Reason</option>

            {reasons.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>
        </div>

        {selectedReason === "other" && (
          <textarea
            value={customReason}
            onChange={(event) => onCustomReasonChange(event.target.value)}
            placeholder="Type the reason"
            rows={3}
            className="mb-5 min-h-20 w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-600 outline-none placeholder:text-gray-400 focus:border-[#f47773]"
          />
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 flex-1 rounded-full border border-gray-500 bg-transparent text-xs font-semibold text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onReject}
            disabled={!canReject}
            className="h-9 flex-1 rounded-full bg-[#f47773] text-xs font-semibold text-white hover:bg-[#ed6b67] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectApplicantModal;