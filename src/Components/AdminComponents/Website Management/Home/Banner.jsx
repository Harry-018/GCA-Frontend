const Banner = ({
  admissionStatus = "Open",
  schoolYear = "2026 - 2027",
  title = "",
  quote = ``,
  image = "",
  onEdit,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-[#f7f8ff] p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="rounded-full text-xs sm:text-sm font-bold text-swamp-green">
          Banner
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-gray-300 px-5 py-2 text-[9px] sm:text-xs text-gray-600 transition hover:bg-gray-100"
        >
          Edit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 text-[9px] sm:text-xs text-gray-600">
        <p>
          Enrollment Status:
          <span className="pl-3 font-[PoppinsBold]">{admissionStatus}</span>
        </p>

        <p>
          School Year:
          <span className="pl-3 font-[PoppinsBold]">{schoolYear}</span>
        </p>
      </div>

      <div className="pt-4">
        <label className="text-[9px] sm:text-xs text-gray-600">
          Banner Image:
        </label>

        <div className="mt-1 overflow-hidden rounded-lg border border-gray-300 bg-white">
          {image ? (
            <img
              src={image}
              alt="Banner"
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="flex h-40 items-center justify-center text-[9px] text-gray-400 sm:text-xs">
              No banner image
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <label className="text-[9px] sm:text-xs text-gray-600">Title:</label>

        <div className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-3 text-[9px] sm:text-xs text-gray-500">
          {title}
        </div>
      </div>

      <div className="pt-4">
        <label className="text-[9px] sm:text-xs text-gray-600">Quote:</label>

        <div className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-3 text-[9px] sm:text-xs leading-relaxed text-gray-500">
          {quote}
        </div>
      </div>
    </section>
  );
};

export default Banner;
