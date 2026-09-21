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
      <div className="flex max-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col gap-y-5 overflow-y-auto rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
        <h2 className="font-[PoppinsBold] text-base text-[#f27773]">
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
            className="h-9 flex-1 rounded-full border border-gray-300 bg-transparent font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="h-9 flex-1 rounded-full bg-[#f27773] font-[PoppinsBold] text-xs text-white transition hover:bg-[#ed6661]"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAnnouncementModal;