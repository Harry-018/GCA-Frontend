import React from "react";

const RejectModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 font-[Poppins]">
      <div className="w-full max-w-130 rounded-[20px] border border-[#2d2d2d]/20 bg-[#f3f3f1] px-6 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
        <h2 className="text-center text-[17px] font-[PoppinsBold] text-[#2d2d2d]">
          Reject Applicant
        </h2>

        <p className="pt-4 text-center text-xs leading-6 text-gray-600 font-[Poppins]">
          Upon clicking &quot;Reject&quot;, you confirm that this applicant&apos;s
          submitted documents will not proceed to enrollment and the application
          will be marked as rejected.
        </p>

        <div className="py-7 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={onClose}
            className="min-w-30 rounded-full border border-gray-400 bg-transparent px-5 py-2.5 text-xs font-[Poppins] text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="min-w-30 rounded-full bg-[#f26d69] px-5 py-2.5 text-xs font-[Poppins] text-white transition hover:bg-[#e76362]"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
