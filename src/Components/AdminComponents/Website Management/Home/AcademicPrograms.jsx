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
    <section className="relative w-full overflow-hidden rounded-2xl bg-[#0c2423] shadow-sm">
      <div className="absolute right-4 top-4 z-30 flex flex-wrap gap-2">
        <button type="button" onClick={onEdit} className="rounded-xl bg-white/15 px-3 py-2 text-xs font-[PoppinsBold] text-white ring-1 ring-white/25 transition hover:bg-white/25">Edit</button>
        <button type="button" onClick={onAdd} className="rounded-xl bg-parent-green px-3 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent">Add</button>
        <button type="button" onClick={onRemove} className="rounded-xl bg-reject/90 px-3 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-reject">Remove</button>
      </div>

      <div className="grid w-full items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:[&>*:first-child]:order-2">
        <div className="relative min-h-64 sm:min-h-80 lg:min-h-105">
          {activeProgram?.image ? (
            <img src={activeProgram.image} alt={activeProgram.name} className="absolute inset-0 h-full w-full object-cover brightness-90" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-sm text-white/50">No program image</div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0c2423]/45 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center gap-5 px-5 py-12 sm:px-10 lg:px-16 lg:py-16">
          <span className="font-[PoppinsBold] text-sm uppercase tracking-[0.35em] text-parent-mint">Academic Programs</span>
          <h2 className="max-w-xl font-[SuperJoyful] text-4xl leading-[1.05] text-parent-mint sm:text-5xl">
            {activeProgram?.name || "Program"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {programs.map((program) => {
              const isActive = program.name === selectedProgram;
              return (
                <button
                  key={program.id}
                  type="button"
                  onClick={() => onProgramChange?.(program.name)}
                  className={`rounded-full px-4 py-2 text-xs font-[PoppinsBold] transition ${isActive ? "bg-parent-mint text-[#0c2423]" : "bg-white/10 text-white/80 hover:bg-white/20"}`}
                >
                  {program.name}
                </button>
              );
            })}
          </div>
          <p className="max-w-xl font-[Poppins] text-sm leading-relaxed text-bone/85 sm:text-base">
            {activeProgram?.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-white/60">Minimum age</p>
              <p className="mt-1 text-sm font-[PoppinsBold] text-white">{activeProgram?.minAge}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-white/60">Maximum age</p>
              <p className="mt-1 text-sm font-[PoppinsBold] text-white">{activeProgram?.maxAge}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;
