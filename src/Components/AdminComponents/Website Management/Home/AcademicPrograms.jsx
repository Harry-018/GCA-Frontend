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
    <section className="flex h-full min-w-0 flex-col rounded-3xl border border-parent-accent/15 bg-bone p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-[PoppinsBold] uppercase tracking-[0.14em] text-parent-accent">
            Programs
          </p>
          <h2 className="mt-1 text-sm font-[PoppinsBold] text-parent-green sm:text-base">
            Academic programs
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border border-parent-accent/20 px-3 py-2 text-xs font-[Poppins] text-parent-green transition hover:bg-parent-pale/30 sm:text-xs"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onAdd}
            className="rounded-xl bg-parent-green px-3 py-2 text-xs font-[Poppins] text-white transition hover:bg-parent-accent sm:text-xs"
          >
            Add
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="rounded-xl border border-reject/20 bg-reject/5 px-3 py-2 text-xs font-[Poppins] text-reject transition hover:bg-reject/10 sm:text-xs"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-parent-pale/25 p-2">
        {programs.map((program) => {
          const isActive = program.name === selectedProgram;

          return (
            <button
              key={program.id}
              type="button"
              onClick={() => onProgramChange?.(program.name)}
              className={`rounded-full px-4 py-2 font-[Poppins] text-xs transition ${
                isActive
                  ? "bg-parent-green text-white"
                  : "text-gray-500 hover:bg-parent-accent/15"
              }`}
            >
              {program.name}
            </button>
          );
        })}
      </div>

      {activeProgram && (
        <div
          className={`mt-4 grid flex-1 items-stretch gap-4 ${
            activeProgram.image
              ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
              : "grid-cols-1"
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-parent-accent/10 bg-white p-3 sm:p-4">
                <p className="text-xs text-gray-500">Minimum age</p>
                <p className="mt-1 text-sm font-[PoppinsBold] text-parent-green">
                  {activeProgram.minAge}
                </p>
              </div>
              <div className="rounded-2xl border border-parent-accent/10 bg-white p-3 sm:p-4">
                <p className="text-xs text-gray-500">Maximum age</p>
                <p className="mt-1 text-sm font-[PoppinsBold] text-parent-green">
                  {activeProgram.maxAge}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                Program description
              </p>
              <div className="mt-1.5 min-h-24 flex-1 rounded-2xl border border-parent-accent/10 bg-white px-3 py-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
                {activeProgram.description}
              </div>
            </div>
          </div>

          {activeProgram.image && (
            <div className="h-44 min-h-44 overflow-hidden rounded-2xl border border-parent-accent/10 bg-parent-pale/20 sm:h-48 sm:min-h-48 lg:h-full lg:min-h-52">
              <img
                src={activeProgram.image}
                alt={activeProgram.name}
                className="h-full min-h-44 w-full object-cover sm:min-h-48 lg:min-h-52"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AcademicPrograms;
