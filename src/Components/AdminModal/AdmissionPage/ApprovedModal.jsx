import React from "react";

const ApprovedModal = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  danger = false,
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 font-[Poppins]">
      <div className="w-full max-w-md rounded-2xl bg-bone px-5 py-5 shadow-lg">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-[PoppinsBold] text-swamp-green text-center">
            {title}
          </h2>
          <p className="text-xs text-gray-600 text-center">
            {message}
          </p>
        </div>

        <div className="flex justify-center gap-5 py-6">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-400 px-5 py-1.5 text-md font-semibold text-gray-500 transition hover:bg-gray-100"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full px-6 py-1.5 text-md font-[PoppinsBold] text-white transition ${
              danger
                ? "bg-[#ff7272] hover:bg-[#f45f5f]"
                : "bg-swamp-green hover:bg-swamp-green"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedModal;
