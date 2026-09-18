import React from "react";

const AddSkillModal = ({
  isOpen,
  skillName,
  description,
  onSkillNameChange,
  onDescriptionChange,
  onCancel,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-86.5 rounded-2xl bg-[#f8f9ff] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-base text-swamp-green">
          Add Skill
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
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-sm outline-none focus:border-swamp-green"
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
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-sm outline-none focus:border-swamp-green"
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
            onClick={onAdd}
            className="flex-1 rounded-full bg-[#9caf7c] px-4 py-2 font-[Poppins] text-xs text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;