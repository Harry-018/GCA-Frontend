import React from "react";

const EditSkillModal = ({
  isOpen,
  skillName,
  description,
  onSkillNameChange,
  onDescriptionChange,
  onCancel,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#f8f9ff] p-6 shadow-lg">
        <h2 className="font-[Poppins] text-base text-swamp-green">
          Edit Skill
        </h2>

        {/* Skill Name */}
        <div className="flex flex-col gap-1 pt-7">
          <label className="font-[Poppins] text-xs text-gray-600">
            Skill Name
          </label>

          <input
            type="text"
            value={skillName}
            onChange={onSkillNameChange}
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-sm text-gray-600 outline-none focus:border-swamp-green"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 pt-4">
          <label className="font-[Poppins] text-xs text-gray-600">
            Description:
          </label>

          <input
            type="text"
            value={description}
            onChange={onDescriptionChange}
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-sm text-gray-600 outline-none focus:border-swamp-green"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 font-[Poppins] text-xs text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="flex-1 rounded-full bg-[#9caf7c] px-4 py-2 font-[Poppins] text-xs text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSkillModal;