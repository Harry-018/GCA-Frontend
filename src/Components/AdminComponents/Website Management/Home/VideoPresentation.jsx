const VideoPresentation = ({ videoTitle = "", videoSrc, onEdit }) => {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-egg shadow-sm">
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-4 top-4 z-30 rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
      >
        Edit video
      </button>

      <div className="grid w-full items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="bg-[#17201f] p-4 sm:p-6 lg:p-8">
          <div className="overflow-hidden rounded-2xl">
            <video controls className="aspect-video w-full object-contain" src={videoSrc}>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 px-5 py-12 sm:px-10 lg:px-16 lg:py-16">
          <span className="font-[PoppinsBold] text-sm uppercase tracking-[0.35em] text-parent-green/80">Video Presentation</span>
          <h2 className="max-w-xl font-[SuperJoyful] text-4xl leading-[1.05] text-parent-green sm:text-5xl">
            {videoTitle || "School Video"}
          </h2>
          <p className="max-w-xl font-[Poppins] text-sm leading-relaxed text-egg-dark/75 sm:text-base">
            Showcase your school&apos;s story and values through this featured video on the homepage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoPresentation;
