import { X, Pencil } from "lucide-react";

const GRADE_OPTIONS = [
  { value: "A", label: "Advanced" },
  { value: "B", label: "Building" },
  { value: "C", label: "Consistent" },
  { value: "D", label: "Development" },
  { value: "E", label: "Never" },
];

const SidePanel = ({ title, id, skills, onClose, openGradeId, toggleGrade, onGradeChange }) => (
  <>
    <div
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out"
      onClick={onClose}
    />

    <div className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-bone shadow-2xl transition-all duration-300 ease-in-out sm:max-w-md">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#082d2a] sm:h-9 sm:w-9">
            <span className="text-2xs font-[PoppinsBold] text-bone">
              {id}
            </span>
          </div>
          <div>
            <h2 className="text-xs font-[PoppinsBold] uppercase tracking-wide text-[#082d2a] sm:text-sm">
              {title}
            </h2>
            <p className="text-[9px] text-gray-400 sm:text-2xs">Tap grade to edit</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-200 sm:h-8 sm:w-8"
        >
          <X size={14} />
        </button>
      </div>

      {/* Skills List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
        {skills.length > 0 ? (
          <div className="flex flex-col gap-2">
            {skills.map((item, index) => {
              const gradeId = `${id}-${index}`;
              const isGradeOpen = openGradeId === gradeId;

              return (
                <div
                  key={gradeId}
                  className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 px-3 py-3 transition-all duration-300 ease-in-out hover:border-[#9caf7d]/30 hover:bg-[#9caf7d]/5 sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3.5"
                >
                  {/* Skill Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-[PoppinsBold] text-[#082d2a] sm:text-xs">
                      {item.skill}
                    </p>
                    {item.description && (
                      <p className="py-1 text-[9px] leading-relaxed text-gray-400 sm:py-1.5 sm:text-2xs">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Grade - Editable */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleGrade(gradeId)}
                      className="group flex h-8 w-16 items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#9caf7d]/40 bg-[#9caf7d]/5 text-[11px] font-[PoppinsBold] text-[#082d2a] transition-all duration-300 ease-in-out hover:border-[#9caf7d] hover:bg-[#9caf7d]/15 sm:h-10 sm:w-20 sm:gap-1.5 sm:rounded-xl sm:text-sm"
                    >
                      {item.grade || "--"}
                      <Pencil size={8} className="text-[#9caf7d] opacity-0 transition group-hover:opacity-100" />
                    </button>

                    {isGradeOpen && (
                      <div className="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out sm:top-12 sm:w-48">
                        <div className="border-b border-gray-100 px-3 py-2">
                          <p className="text-[9px] font-[PoppinsBold] uppercase text-gray-400">
                            Select Grade
                          </p>
                        </div>
                        {GRADE_OPTIONS.map((grade) => {
                          const isSelected = item.grade === grade.value;
                          return (
                            <button
                              key={grade.value}
                              type="button"
                              onClick={() => {
                                onGradeChange(id, index, grade.value);
                                toggleGrade(null);
                              }}
                              className={`flex w-full items-center gap-2 px-2.5 py-2 text-left text-[11px] transition-all duration-200 ease-in-out hover:bg-[#9caf7d]/10 sm:gap-2.5 sm:px-3 sm:py-2.5 sm:text-xs ${
                                isSelected
                                  ? "bg-[#9caf7d]/10 text-[#082d2a]"
                                  : "text-gray-600 hover:text-[#082d2a]"
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-[PoppinsBold] sm:h-6 sm:w-6 sm:text-2xs ${
                                  isSelected
                                    ? "bg-[#082d2a] text-white"
                                    : "bg-[#9caf7d]/15 text-[#082d2a]"
                                }`}
                              >
                                {grade.value}
                              </span>
                              <span>{grade.label}</span>
                              {isSelected && (
                                <span className="ml-auto text-[8px] text-[#9caf7d] sm:text-[9px]">
                                  Current
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-10 text-center text-[11px] text-gray-400 sm:text-xs">
            No skills available
          </p>
        )}
      </div>
    </div>
  </>
);

export default SidePanel;
