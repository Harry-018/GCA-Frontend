const Mission = ({
  title = "Raising Godly and Lifelong Learners",
  description = "",
  onEdit,
}) => {
  return (
    <section className="h-fit rounded-2xl border border-gray-200 bg-[#f7f8ff] p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-[9px] sm:text-sm font-bold text-swamp-green">
          Mission
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-gray-300 px-5 py-2 text-[9px] sm:text-xs text-gray-600 transition hover:bg-gray-100"
        >
          Edit
        </button>
      </div>

      <div className="pt-4">
        <label className="text-[9px] sm:text-xs text-gray-600">
          Title:
        </label>

        <div className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-3 text-[9px] sm:text-xs text-gray-500">
          {title}
        </div>
      </div>

      <div className="pt-4">
        <label className="text-[9px] sm:text-xs text-gray-600">
          Description:
        </label>

        <div className="mt-1 min-h-17 rounded-lg border border-gray-300 bg-white px-3 py-3 text-[9px] sm:text-xs leading-relaxed text-gray-500">
          {description}
        </div>
      </div>
    </section>
  );
};

export default Mission;