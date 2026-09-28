import React from "react";

const RemoveSectionModal = ({ isOpen, onClose, sectionName, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5">
      <div className="flex max-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col gap-y-5 overflow-y-auto rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
        <h2 className="font-[PoppinsBold] text-base text-[#f27773]">
          Deactivate Section
        </h2>

        <div className="flex flex-col gap-y-3 text-xs leading-relaxed text-gray-600">
          <p>
            Are you sure you want to deactivate{" "}
            <span className="font-[PoppinsBold]">{sectionName}</span>?
          </p>

          <p>
            The section will no longer appear in the active section list. Its
            information will be cleared such as assigned teacher and added
            students.
          </p>

          <span className="font-[PoppinsBold]">
            This will not permanently delete data.
          </span>
        </div>

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
            onClick={onRemove}
            className="h-9 flex-1 rounded-full bg-[#f27773] font-[PoppinsBold] text-xs text-white transition hover:bg-[#ed6661]"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSectionModal;
