const VideoPresentation = ({ videoTitle = "", videoSrc, onEdit }) => {
  return (
    <section className="h-full rounded-3xl border border-parent-accent/15 bg-bone p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-[PoppinsBold] uppercase tracking-[0.14em] text-parent-accent">
            Media
          </p>
          <h2 className="mt-1 text-sm font-[PoppinsBold] text-parent-green sm:text-base">
            Video presentation
          </h2>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl bg-parent-pale/50 px-4 py-2 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parent-green"
        >
          Edit video
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-parent-pale/30 px-3 py-3">
        <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
          Video title
        </p>
        <p className="mt-1 text-xs text-gray-700 sm:text-sm">{videoTitle}</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-[#17201f]">
        <video
          controls
          className="aspect-video w-full object-contain"
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoPresentation;
