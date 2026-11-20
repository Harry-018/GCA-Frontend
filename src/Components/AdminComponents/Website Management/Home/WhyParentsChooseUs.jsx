const WhyParentsChooseUs = ({ reasons = [], onAdd, onEdit, onRemove }) => {
  return (
    <section className="h-full rounded-3xl border border-parent-accent/15 bg-bone p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-[PoppinsBold] uppercase tracking-[0.14em] text-parent-accent">
            Parent highlights
          </p>
          <h2 className="mt-1 text-sm font-[PoppinsBold] text-parent-green sm:text-base">
            Why parents choose us
          </h2>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parent-green"
        >
          Add reason
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {reasons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-parent-accent/25 bg-parent-pale/20 px-4 py-8 text-center">
            <p className="text-xs font-[PoppinsBold] text-parent-green">
              No parent highlights yet
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              Add a reason to show families what makes your school special.
            </p>
          </div>
        ) : (
          reasons.map((reason, index) => (
            <div
              key={reason.id}
              className="flex items-center gap-3 rounded-2xl border border-parent-accent/10 bg-white p-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-parent-pale/50 text-xs font-[PoppinsBold] text-parent-green">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
                {reason.text}
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button
                  type="button"
                  onClick={() => onEdit?.(reason)}
                  className="rounded-lg border border-parent-accent/20 px-2.5 py-1.5 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale/30 sm:text-xs"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onRemove?.(reason)}
                  className="rounded-lg border border-reject/20 bg-reject/5 px-2.5 py-1.5 text-xs font-[PoppinsBold] text-reject transition hover:bg-reject/10 sm:text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default WhyParentsChooseUs;
