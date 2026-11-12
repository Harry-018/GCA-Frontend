import React from "react";

const RemoveChildrenActivityModal = ({
  isOpen,
  onClose,
  activity,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-md sm:p-6">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-sm font-[PoppinsBold] text-reject sm:text-base">
            Remove Children Activity
          </h2>

          <p className="mt-1 text-[9px] text-gray-500 sm:text-xs">
            This action will permanently remove the activity.
          </p>
        </div>

        {/* Activity */}
        <div className="rounded-lg border border-parent-accent/25 bg-bone p-3">
          <p className="text-[9px] text-gray-500 sm:text-xs">Activity:</p>

          <p className="mt-1 text-[10px] text-gray-700 sm:text-sm">
            {activity.activity_title}
          </p>
        </div>

        {/* Warning */}
        <p className="mt-4 text-[9px] leading-relaxed text-gray-500 sm:text-xs">
          Are you sure you want to remove this children activity? This action
          cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-full border border-parent-accent/25 px-4 py-2 text-[9px] text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(activity.activity_id)}
            disabled={loading}
            className="flex-1 rounded-full bg-reject px-4 py-2 text-[9px] text-white transition hover:bg-reject/80 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
          >
            {loading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveChildrenActivityModal;
