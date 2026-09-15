import React from "react";

const RemoveSectionModal = ({
  isOpen,
  onClose,
  sectionName,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5">
<div className="flex w-full max-w-md flex-col gap-y-5 rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
        <h2 className="font-[PoppinsBold] text-base text-[#f27773]">
          Remove Class
        </h2>

        {/* Message */}
        <div className="flex flex-col gap-y-3 text-xs leading-relaxed text-gray-600">
          <p>
            Clicking “Remove” will remove this class and its information.
            Such as selected teacher and students.
          </p>

          <p>
            It will not permanently delete the data. It will just remove
            the class from the list.
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
            onClick={() => onRemove(sectionName)}
            className="h-9 flex-1 rounded-full bg-[#f27773] font-[PoppinsBold] text-xs text-white transition hover:bg-[#ed6661]"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSectionModal;