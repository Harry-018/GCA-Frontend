const WhyParentsChooseUs = ({ reasons = [], onAdd, onEdit, onRemove }) => {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-[#0c2423] shadow-sm">
      <button
        type="button"
        onClick={onAdd}
        className="absolute right-4 top-4 z-30 rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
      >
        Add reason
      </button>

      <div className="px-5 py-12 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="font-[PoppinsBold] text-sm uppercase tracking-[0.35em] text-parent-mint">Parent Highlights</span>
          <h2 className="mt-4 max-w-2xl font-[SuperJoyful] text-4xl leading-[1.05] text-parent-mint sm:text-5xl">
            Why Parents Choose Us
          </h2>

          <div className="mt-8 flex flex-col gap-3">
            {reasons.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-8 text-center text-sm text-white/60">
                No parent highlights yet. Add a reason to show families what makes your school special.
              </div>
            ) : (
              reasons.map((reason, index) => (
                <div key={reason.id} className="flex flex-wrap items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 sm:flex-nowrap sm:items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-parent-mint/20 text-xs font-[PoppinsBold] text-parent-mint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="min-w-0 flex-1 basis-[calc(100%-3rem)] text-sm leading-relaxed text-bone/90 sm:basis-auto">
                    {reason.text}
                  </p>
                  <div className="flex w-full shrink-0 justify-end gap-2 sm:w-auto">
                    <button type="button" onClick={() => onEdit?.(reason)} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-[PoppinsBold] text-white ring-1 ring-white/15 transition hover:bg-white/20">Edit</button>
                    <button type="button" onClick={() => onRemove?.(reason)} className="rounded-lg bg-reject/20 px-3 py-1.5 text-xs font-[PoppinsBold] text-red-200 ring-1 ring-reject/30 transition hover:bg-reject/30">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyParentsChooseUs;
