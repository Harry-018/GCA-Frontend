import React from "react";

const SkillModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingSkill,
  skillName,
  setSkillName,
  description,
  setDescription,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(editingSkill);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 ">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg rounded-2xl bg-[#f4f5fc] p-6 shadow-lg"
      >
        <h2 className="font-[PoppinsBold] text-base text-swamp-green">
          {isEditing ? "Edit Skill" : "Add Skill"}
        </h2>

        <div className="mt-5 space-y-4">
          {/* Skill Name */}
          <div>
            <label className="text-xs text-gray-500">Skill Name</label>

            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              autoFocus
              className="mt-2 h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none focus:border-swamp-green"
              placeholder="Enter skill name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-gray-500">Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-xs text-gray-700 outline-none focus:border-swamp-green"
              placeholder="Describe the skill"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 flex-1 rounded-full border border-gray-300 text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-9 flex-1 rounded-full bg-swamp-green text-xs text-white transition hover:bg-lime-green"
          >
            {isEditing ? "Save" : "Add "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillModal;
