const WhyParentsChooseUs = ({
  reasons = [],
  onAdd,
  onEdit,
  onRemove,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-[#f7f8ff] p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="rounded-full bg-swamp-green/15 px-4 py-1 text-[9px] sm:text-xs font-bold text-swamp-green">
          Why Parent's Choose Us?
        </h2>

        <button
          type="button"
          onClick={onAdd}
          className="rounded-full bg-swamp-green px-5 py-2 text-[9px] sm:text-xs font-medium text-white transition hover:bg-lime-green"
        >
          Add
        </button>
      </div>

      {/* Reasons */}
      <div className="flex flex-col gap-3 pt-10">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="flex items-center gap-2"
          >
            <div className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[9px] sm:text-xs text-gray-500">
              {reason.text}
            </div>

            <button
              type="button"
              onClick={() => onEdit?.(reason)}
              className="rounded-full border border-gray-300 px-5 py-2 text-[9px] sm:text-xs text-gray-600 transition hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onRemove?.(reason)}
              className="rounded-full bg-[#f27777] px-4 py-2 text-[9px] sm:text-xs font-medium text-white transition hover:bg-[#e56666]"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyParentsChooseUs;