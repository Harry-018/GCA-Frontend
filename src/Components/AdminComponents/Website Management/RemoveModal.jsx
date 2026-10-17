import React from "react";

const RemoveModal = ({
  isOpen,
  title = "Confirm Removal",
  itemName = "",
  message = "",
  error = "",
  deleting = false,
  onClose,
  onRemove,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (deleting) return;
    onClose?.();
  };

  const handleRemove = () => {
    if (deleting) return;
    onRemove?.();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 font-[Poppins] shadow-xl"
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2
            id="remove-modal-title"
            className="text-lg font-[PoppinsBold] text-reject"
          >
            {title}
          </h2>
        </div>

        {/* Message */}
        <div className="mb-5 text-sm leading-6 text-gray-600">
          {message || (
            <>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-[#3b3b3b]">{itemName}</span>?
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={deleting}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm  text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleRemove}
            disabled={deleting}
            className="rounded-full bg-reject px-4 py-2 text-sm text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
