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
      <div className="w-full max-w-md rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-lg">
        <h2 className=" text-sm font-[PoppinsBold] text-parent-green">
          Add Skills
        </h2>

        <div className="flex flex-col gap-1 pt-4">
          <label className="font-[Poppins] text-2xs text-gray-600">
            Select Skills:
          </label>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-parent-accent/25 bg-bone">
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
                      className="h-3.5 w-3.5 accent-parent-green"
                    />

                    <div className="flex min-w-0 flex-col">
                      <span className="font-[Poppins] text-2xs text-gray-600">
                        {skill.skill_name}
                      </span>

                      {skill.description && (
                        <span className="font-[Poppins] text-[10px] sm:text-xs text-gray-400">
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
            className="w-1/2 rounded-full border border-parent-accent/25 py-1.5 text-xs font-[PoppinsBold] text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onAdd}
            disabled={selectedSkillIds.length === 0}
            className="w-1/2 rounded-full bg-parent-green py-1.5 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;
