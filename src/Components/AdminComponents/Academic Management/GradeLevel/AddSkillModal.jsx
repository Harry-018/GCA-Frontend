const AddSkillModal = ({
  isOpen,
  skills = [],
  selectedSkillIds = [],
  onToggle,
  onCancel,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-sm font-semibold text-swamp-green">
          Add Skills
        </h2>

        <div className="flex flex-col gap-1 pt-4">
          <label className="font-[Poppins] text-2xs text-gray-600">
            Select Skills:
          </label>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-300 bg-white">
            {skills.length === 0 ? (
              <p className="px-3 py-4 text-center font-[Poppins] text-2xs text-gray-400">
                No available skills.
              </p>
            ) : (
              skills.map((skill) => {
                const skillId = Number(skill.skill_id);
                const isSelected = selectedSkillIds.includes(skillId);

                return (
                  <label
                    key={skill.skill_id}
                    className="flex cursor-pointer items-center gap-2 border-b border-gray-100 px-3 py-2.5 last:border-b-0 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(skillId)}
                      className="h-3.5 w-3.5 accent-[#91a77a]"
                    />

                    <div className="flex min-w-0 flex-col">
                      <span className="font-[Poppins] text-2xs text-gray-600">
                        {skill.skill_name}
                      </span>

                      {skill.description && (
                        <span className="font-[Poppins] text-[10px] text-gray-400">
                          {skill.description}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })
            )}
          </div>

          <p className="pt-1 font-[Poppins] text-2xs text-gray-400">
            {selectedSkillIds.length} skill
            {selectedSkillIds.length !== 1 ? "s" : ""} selected
          </p>
        </div>

        <div className="flex gap-2 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 rounded-full border border-gray-300 py-1.5 font-[Poppins] text-xs font-semibold text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onAdd}
            disabled={selectedSkillIds.length === 0}
            className="w-1/2 rounded-full bg-[#91a77a] py-1.5 font-[Poppins] text-xs font-semibold text-white transition hover:bg-[#7d9367] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;
