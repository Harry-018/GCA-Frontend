import React from "react";

const RemoveAnnouncementModal = ({
  isOpen,
  onClose,
  onRemove,
  announcement,
}) => {
  if (!isOpen) return null;

  const handleRemove = () => {
    onRemove?.(announcement);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5">
      <div className="flex max-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col gap-y-5 overflow-y-auto rounded-2xl bg-linear-to-br from-bone via-white to-parent-pale/60 p-6 shadow-lg">
        <h2 className="font-[PoppinsBold] text-base text-reject">
          Remove Announcement
        </h2>

        {/* Message */}
        <div className="flex flex-col gap-y-3 text-xs leading-relaxed text-gray-600">
          <p>
            Clicking “Remove” will remove this announcement and its information.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 flex-1 rounded-full border border-parent-accent/25 bg-transparent font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="h-9 flex-1 rounded-full bg-reject font-[PoppinsBold] text-xs text-white transition hover:bg-reject/80"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAnnouncementModal;