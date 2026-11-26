const Banner = ({
  admissionStatus = "Open",
  schoolYear = "2026 - 2027",
  title = "",
  quote = ``,
  image = "",
  onEdit,
}) => {
  const isClosed =
    String(admissionStatus).trim().toLowerCase() === "closed";

  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-egg shadow-sm">
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-4 top-4 z-30 rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
      >
        Edit banner
      </button>

      <div className="grid w-full items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative min-h-64 sm:min-h-80 lg:min-h-105">
          {image ? (
            <img src={image} alt="Banner" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-parent-pale/30 text-sm text-gray-400">
              No banner image
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center gap-5 px-5 py-12 sm:px-10 lg:px-16 lg:py-16">
          <span className="font-[PoppinsBold] text-sm uppercase tracking-[0.35em] text-parent-green/80">
            Homepage Banner
          </span>
          <h2 className="max-w-xl font-[SuperJoyful] text-4xl leading-[1.05] text-parent-green sm:text-5xl">
            {title || "Banner Title"}
          </h2>
          <p className="max-w-xl font-[Poppins] text-sm leading-relaxed text-egg-dark/75 sm:text-base">
            {quote}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <div className={`rounded-2xl px-4 py-3 ${isClosed ? "bg-reject/10" : "bg-parent-pale/50"}`}>
              <p className="text-xs text-gray-500">Enrollment status</p>
              <p className={`mt-1 text-sm font-[PoppinsBold] ${isClosed ? "text-reject" : "text-parent-green"}`}>
                {admissionStatus}
              </p>
            </div>
            <div className="rounded-2xl bg-parent-pale/50 px-4 py-3">
              <p className="text-xs text-gray-500">School year</p>
              <p className="mt-1 text-sm font-[PoppinsBold] text-parent-green">{schoolYear}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
