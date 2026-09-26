import React from "react";
const RemoveGradeLevelModal = ({
  isOpen,
  gradeLevel,
  errorMessage,
  onCancel,
  onRemove,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Remove Grade Level
        </h2>
        {errorMessage ? (
          <div className="pt-4">
            <p className="text-xs leading-5 text-egg-dark">
              Unable to remove{" "}
              <span className="font-[PoppinsBold] text-12px">{gradeLevel}</span>
              .
            </p>
            <p className="pt-2 text-[12px] leading-5 text-reject">
              {errorMessage}
            </p>
          </div>
        ) : (
          <>
            <p className="pt-4 text-xs leading-5 text-egg-dark">
              Are you sure you want to remove
              <span className="font-[PoppinsBold]"> {gradeLevel} </span> from
              the active school year?
            </p>
            <p className="pt-2 text-[12px] text-egg-dark/80">
              The grade level will be archived and can be added again later.
            </p>
          </>
        )}
        <div className="flex gap-2 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 rounded-full border border-gray-300 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100"
          >
            {errorMessage ? "Close" : "Cancel"}
          </button>
          {!errorMessage && (
            <button
              type="button"
              onClick={onRemove}
              className="w-1/2 rounded-full bg-reject py-1.5 text-xs font-semibold text-white hover:bg-red-500"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default RemoveGradeLevelModal;
