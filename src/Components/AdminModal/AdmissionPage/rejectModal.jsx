import React from "react";
const RejectModal = ({
  isOpen,
  onClose,
  onConfirm,
  rejectionReasons,
  rejectionReasonId,
  setRejectionReasonId,
  loading,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#f5f6fd] px-6 py-5 shadow-lg">
        <h2 className="text-base font-bold text-[#f47773]">Reject Applicant</h2>
        <p className="pt-4 text-xs leading-6 text-gray-600">
          Upon clicking &quot;Reject&quot;, you confirm that this
          applicant&apos;s submitted documents will not proceed to enrollment
          and the application will be marked as rejected.
        </p>
        <div className="flex items-center gap-4 py-5">
          <label className="w-20 shrink-0 text-xs text-gray-600">
            Select Reason:
          </label>
          <select
            value={rejectionReasonId}
            onChange={(event) => setRejectionReasonId(event.target.value)}
            className="h-9 flex-1 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-600 outline-none focus:border-[#f47773]"
          >
            <option value="">Select a reason</option>
            {rejectionReasons.map((reason) => (
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
            disabled={loading}
            className="h-9 flex-1 rounded-full border border-gray-500 bg-transparent text-xs font-semibold text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!rejectionReasonId || loading}
            className="h-9 flex-1 rounded-full bg-[#f47773] text-xs font-semibold text-white hover:bg-[#ed6b67] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default RejectModal;
