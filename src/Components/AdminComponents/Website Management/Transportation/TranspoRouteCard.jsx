const TranspoRouteCard = ({ location, distance, price, onEdit, onRemove }) => {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-sm">
      <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-white/50">Location</p>
      <p className="mt-1 font-[PoppinsBold] text-sm text-white sm:text-base">{location}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
          <p className="text-[10px] uppercase tracking-wide text-white/45">Distance</p>
          <p className="mt-1 text-xs font-[PoppinsBold] text-bone sm:text-sm">{distance}</p>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
          <p className="text-[10px] uppercase tracking-wide text-white/45">Price</p>
          <p className="mt-1 text-xs font-[PoppinsBold] text-parent-mint sm:text-sm">₱{price}</p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-4">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-[PoppinsBold] text-white ring-1 ring-white/15 transition hover:bg-white/20"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 rounded-lg bg-reject/20 px-3 py-2 text-xs font-[PoppinsBold] text-red-200 ring-1 ring-reject/30 transition hover:bg-reject/30"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TranspoRouteCard;
