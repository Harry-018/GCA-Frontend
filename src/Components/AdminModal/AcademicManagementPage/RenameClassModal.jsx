import React from "react";

const RenameClass = ({
  isOpen,
  onClose,
  className,
  newName,
  onNameChange,
  onRename,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5">
      <div className="flex max-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col gap-y-5 overflow-y-auto rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
        <h2 className="font-[PoppinsBold] text-base text-swamp-green">
          Rename Class
        </h2>

        {/* Input */}
        <div className="flex flex-col gap-y-1">
          <label className="text-xs text-gray-600">Enter new name:</label>

          <input
            type="text"
            value={newName}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder={className}
            className="h-10 w-full rounded-md border border-gray-300 bg-bone px-3 text-xs text-gray-600 outline-none focus:border-swamp-green"
          />
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
            onClick={onRename}
            className="h-9 flex-1 rounded-full bg-swamp-green font-[PoppinsBold] text-xs text-white transition hover:bg-swamp-green/80"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameClass;
