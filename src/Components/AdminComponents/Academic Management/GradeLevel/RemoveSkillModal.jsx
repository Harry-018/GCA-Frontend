import React from "react";

const RemoveSkillModal = ({
  isOpen,
  onCancel,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-linear-to-br from-bone via-white to-parent-pale/60 p-6 shadow-lg">
        <h2 className=" text-sm font-[PoppinsBold] text-reject">
          Remove Skill
        </h2>

        {/* Message */}
        <p className="pt-4 font-[Poppins] text-xs leading-relaxed text-gray-600">
          Clicking "Remove" will remove this skill and its information,
          such as the skill name and description.
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-parent-accent/25 px-4 py-2 font-[Poppins] text-xs text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="flex-1 rounded-full bg-reject px-4 py-2 text-xs font-[PoppinsBold] text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSkillModal;