import React from "react";
import { X, AlertCircle } from "lucide-react";

const PromotionErrorModal = ({ isOpen, errorMessage, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-bone shadow-xl">
        <div className="flex items-center justify-between border-b border-parent-accent/15 px-6 py-4">
          <h2 className="font-[PoppinsBold] text-base text-reject">
            Promotion Failed
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="mt-0.5 shrink-0 text-reject" />

            <div>
              <p className="text-sm text-gray-800">
                Unable to promote the selected student(s).
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                {errorMessage ||
                  "One or more students already have an enrollment record for the selected school year and grade level."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-parent-accent/15 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-reject px-5 py-2 text-xs text-white hover:bg-reject/80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionErrorModal;
