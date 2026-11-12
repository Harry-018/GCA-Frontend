import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const REASON_OPTIONS = [
  "Account policy violation",
  "Inactive account",
  "Duplicate account",
  "Requested by user",
  "Other",
];

const UserActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  email,
  confirmLabel = "Confirm",
  danger = false,
  showReason = false,
  reason = "",
  onReasonChange,
  customReason = "",
  onCustomReasonChange,
}) => {
  const [isReasonOpen, setIsReasonOpen] = useState(false);

  if (!isOpen) return null;

  const isConfirmDisabled =
    showReason &&
    (!reason || (reason === "Other" && !customReason.trim()));

  const handleClose = () => {
    setIsReasonOpen(false);
    onClose?.();
  };

  const handleConfirm = () => {
    setIsReasonOpen(false);
    onConfirm?.();
  };

  const handleReasonChange = (option) => {
    onReasonChange?.(option);
    setIsReasonOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 ">
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

        {showReason && (
          <div className="flex flex-col gap-y-2">
            <p className="font-[PoppinsBold] text-xs text-gray-700">
              Reason <span className="text-reject">*</span>
            </p>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsReasonOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isReasonOpen}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-bone px-3 py-2 font-[Poppins] text-xs outline-none transition focus:border-swamp-green"
              >
                <span className={reason ? "text-gray-700" : "text-gray-400"}>
                  {reason || "Select a reason"}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    isReasonOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isReasonOpen && (
                <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-300 bg-bone shadow-lg">
                  <ul role="listbox" className="max-h-48 overflow-y-auto py-1">
                    {REASON_OPTIONS.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={reason === option}
                          onClick={() => handleReasonChange(option)}
                          className={`block w-full px-3 py-2 text-left font-[Poppins] text-xs transition hover:bg-swamp-green/10 ${
                            reason === option
                              ? "bg-swamp-green/15 text-swamp-green"
                              : "text-gray-600"
                          }`}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {reason === "Other" && (
              <textarea
                id="disable-reason"
                value={customReason}
                onChange={(e) => onCustomReasonChange?.(e.target.value)}
                placeholder="Type your reason for disabling this account."
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-300 bg-bone px-3 py-2 font-[Poppins] text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-swamp-green"
              />
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 flex-1 items-center justify-center rounded-full border border-gray-300 bg-transparent font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={`flex h-9 flex-1 items-center justify-center rounded-full font-[PoppinsBold] text-xs text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
              danger
                ? "bg-reject hover:bg-reject/80"
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
