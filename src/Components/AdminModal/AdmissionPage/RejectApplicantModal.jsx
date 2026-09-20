import React from "react";
import { X } from "lucide-react";

const RejectApplicantModal = ({
  isOpen,
  onClose,
  onReject,
  reasons = [],
  selectedReason,
  onReasonChange,
  title = "Reject Applicant",
}) => {
  if (!isOpen) return null;

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

        <h2 className="text-base font-bold text-[#f47773]">{title}</h2>

        <div className="flex items-center gap-4 py-5">
          <label className="w-20 shrink-0 text-xs text-gray-600">
            Select Reason:
          </label>

          <select
            value={selectedReason}
            onChange={(event) => onReasonChange(event.target.value)}
          >
            <option value="">Select a reason</option>

            {reasons.map((reason) => (
              <option
                key={reason.rejection_reason_id}
                value={reason.rejection_reason_id}
              >
                {reason.rejection_reason}
              </option>
            ))}
          </select>
        </div>

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
            disabled={!selectedReason}
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
