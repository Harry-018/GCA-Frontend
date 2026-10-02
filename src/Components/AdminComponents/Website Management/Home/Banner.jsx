const Banner = ({
  admissionStatus = "Open",
  schoolYear = "2026 - 2027",
  title = "Discover a joyful pre-school journey with faith, play and learning",
  quote = `"For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God not by works, so that no one can boast." Ephesians 2:8–9 (NIV)`,
  onEdit,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-[#f7f8ff] p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="rounded-full bg-swamp-green/15 px-4 py-1 text-[9px] sm:text-xs font-bold text-swamp-green">
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
          Admission Status:
          <span className="pl-3">{admissionStatus}</span>
        </p>

        <p>
          School Year:
          <span className="pl-3">{schoolYear}</span>
        </p>
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