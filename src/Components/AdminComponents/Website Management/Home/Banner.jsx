const Banner = ({
  admissionStatus = "Open",
  schoolYear = "2026 - 2027",
  title = "",
  quote = ``,
  image = "",
  onEdit,
}) => {
  return (
    <section className="flex h-full min-w-0 flex-col rounded-3xl border border-parent-accent/15 bg-bone p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-[PoppinsBold] uppercase tracking-[0.14em] text-parent-accent">
            Hero section
          </p>
          <h2 className="mt-1 text-sm font-[PoppinsBold] text-parent-green sm:text-base">
            Banner
          </h2>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl bg-parent-pale/50 px-4 py-2 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parent-green"
        >
          Edit banner
        </button>
      </div>

      <div className="mt-4 grid flex-1 items-stretch gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-5">
        <div className="flex min-w-0 flex-col">
          <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
            Banner image
          </p>
          <div className="mt-2 h-44 flex-1 overflow-hidden rounded-2xl border border-parent-accent/15 bg-parent-pale/20 sm:h-48 lg:h-full lg:min-h-52">
            {image ? (
              <img src={image} alt="Banner" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                No banner image
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-parent-pale/35 px-3 py-3">
              <p className="text-xs text-gray-500">Enrollment status</p>
              <p className="mt-1 text-xs font-[PoppinsBold] text-parent-green sm:text-sm">
                {admissionStatus}
              </p>
            </div>
            <div className="rounded-2xl bg-parent-pale/35 px-3 py-3">
              <p className="text-xs text-gray-500">School year</p>
              <p className="mt-1 text-xs font-[PoppinsBold] text-parent-green sm:text-sm">
                {schoolYear}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
              Title
            </p>
            <div className="mt-1.5 rounded-2xl border border-parent-accent/10 bg-white px-3 py-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
              {title}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
              Quote
            </p>
            <div className="mt-1.5 flex-1 rounded-2xl border border-parent-accent/10 bg-white px-3 py-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
              {quote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
