import React from "react";

const RemoveModal = ({
  isOpen,
  title = "Remove Item",
  itemName = "",
  message,
  onClose,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#f8f9ff] p-6 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-[#ff7777]">
          {title}
        </h2>

        {/* Message */}
        <p className="pt-4 font-[Poppins] text-[9px] sm:text-xs leading-relaxed text-gray-600">
          {message || (
            <>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-gray-800">
                {itemName || "this item"}
              </span>
              ?
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 font-[Poppins] text-[9px] sm:text-xs text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="flex-1 rounded-full bg-[#ff7777] px-4 py-2 font-[Poppins] text-[9px] sm:text-xs font-semibold text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;