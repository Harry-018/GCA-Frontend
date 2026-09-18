import React from "react";

const UserActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  email,
  confirmLabel = "Confirm",
  danger = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-md flex-col gap-y-4 rounded-2xl bg-[#f4f5fc] p-5 shadow-lg sm:p-6">
        <h2
          className={`font-[PoppinsBold] text-sm sm:text-base ${
            danger ? "text-reject" : "text-swamp-green"
          }`}
        >
          {title}
        </h2>

        <div className="flex flex-col gap-y-2 text-xs leading-relaxed text-gray-600">
          <p>{description}</p>

          {email && (
            <p>
              Account:{" "}
              <span className="font-[PoppinsBold] text-gray-700">{email}</span>
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 flex-1 items-center justify-center rounded-full border border-gray-300 bg-transparent font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`flex h-9 flex-1 items-center justify-center rounded-full font-[PoppinsBold] text-xs text-white transition ${
              danger
                ? "bg-reject hover:bg-red-500"
                : "bg-swamp-green hover:bg-lime-green"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserActionModal;
