import React from "react";
import { ChevronDown, X } from "lucide-react";

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
      <div className="relative w-full max-w-md rounded-2xl bg-bone px-6 py-5 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h2 className="text-base font-[Poppins] text-reject">{title}</h2>

        <div className="flex items-center gap-4 py-5">
          <label className="w-20 shrink-0 text-xs text-gray-600">
            Select Reason:
          </label>

          <div className="relative flex-1">
            <select
              value={selectedReason}
              onChange={(event) => onReasonChange(event.target.value)}
              className="h-9 w-full appearance-none rounded-md border border-parent-accent/25 bg-bone px-2 pr-8 text-xs text-gray-600 outline-none focus:border-reject"
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

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 flex-1 rounded-full border border-gray-500 bg-transparent text-xs font-[Poppins] text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onReject}
            disabled={!selectedReason}
            className="h-9 flex-1 rounded-full bg-reject text-xs font-[Poppins] text-white hover:bg-reject/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectApplicantModal;
