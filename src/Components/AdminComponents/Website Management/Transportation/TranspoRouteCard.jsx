const TranspoRouteCard = ({
  location,
  distance,
  price,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex h-full min-h-0 w-full shrink-0 flex-col rounded-2xl border border-gray-200 bg-[#f7f8ff] p-4 shadow-md">
      <div>
        <label className="text-[9px] sm:text-xs text-gray-600">Location:</label>

        <div className="mt-1 min-h-8.75 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[9px] sm:text-xs text-gray-500">
          {location}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3">
        <div>
          <label className="text-[9px] sm:text-xs text-gray-600">Distance:</label>

          <div className="mt-1 min-h-8.75 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[9px] sm:text-xs text-gray-500">
            {distance}
          </div>
        </div>

        <div>
          <label className="text-[9px] sm:text-xs text-gray-600">Price:</label>

          <div className="mt-1 min-h-8.75 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[9px] sm:text-xs text-gray-500">
            ₱{price}
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-4">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-[9px] sm:text-xs text-gray-600 transition hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="flex-1 rounded-full bg-[#f27777] px-4 py-2 text-[9px] sm:text-xs font-medium text-white transition hover:bg-[#e56666]"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TranspoRouteCard;