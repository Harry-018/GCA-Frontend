const AcademicPrograms = ({
  programs = [],
  selectedProgram = "Nursery",
  onProgramChange,
  onEdit,
  onAdd,
  onRemove,
}) => {
  const activeProgram =
    programs.find((program) => program.name === selectedProgram) || programs[0];

  return (
    <section className="rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[9px] sm:text-sm font-[PoppinsBold] text-parent-green">
          Academic Programs
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full border border-parent-accent/25 px-5 py-2 text-[9px] sm:text-xs text-gray-600 hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onAdd}
            className="rounded-full bg-parent-green px-5 py-2 text-[9px] sm:text-xs text-white hover:bg-parent-accent"
          >
            Add
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="rounded-full bg-reject px-4 py-2 text-[9px] sm:text-xs text-white hover:bg-reject/80"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Year Level Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-3 sm:gap-4">
        {programs.map((program) => {
          const isActive = program.name === selectedProgram;

          return (
            <button
              key={program.id}
              type="button"
              onClick={() => onProgramChange?.(program.name)}
              className={`rounded-full px-3 py-1 text-[9px] sm:text-xs transition ${
                isActive
                  ? "bg-parent-green text-white"
                  : "text-gray-600 hover:bg-parent-accent/15"
              }`}
            >
              {program.name}
            </button>
          );
        })}
      </div>

      {activeProgram && (
        <>
          {/* Age + Image */}
          <div className="flex flex-wrap gap-3 pt-4 lg:flex-col">
            <div className="flex gap-3">
              <div>
                <label className="text-[9px] sm:text-xs  text-gray-600">
                  Min. Age:
                </label>

                <div className="mt-1 flex h-9 w-25 items-center rounded-lg border border-parent-accent/25 bg-bone px-3 text-[9px] sm:text-xs text-gray-600">
                  {activeProgram.minAge}
                </div>
              </div>

              <div>
                <label className="text-[9px] sm:text-xs text-gray-600">
                  Max. Age:
                </label>

                <div className="mt-1 flex h-9 w-25 items-center rounded-lg border border-parent-accent/25 bg-bone px-3 text-[9px] sm:text-xs text-gray-600">
                  {activeProgram.maxAge}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex">
              {activeProgram.image && (
                <img
                  src={activeProgram.image}
                  alt={activeProgram.name}
                  className="h-40 w-full rounded-lg object-cover lg:w-122"
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div className="pt-1">
            <label className="text-[9px] sm:text-xs text-gray-600">
              Description:
            </label>

            <div className="mt-1 min-h-15 rounded-lg border border-parent-accent/25 bg-bone px-3 py-3 text-[9px] sm:text-xs leading-relaxed text-gray-500">
              {activeProgram.description}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AcademicPrograms;
