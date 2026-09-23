const VideoPresentation = ({
  videoTitle = "Grace Christian Learning Hymn",
  videoSrc,
  onEdit,
}) => {
  return (
    <section className="flex min-h-0 flex-col rounded-2xl border border-gray-200 bg-[#f7f8ff] p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="rounded-full bg-swamp-green/15 px-4 py-1 text-[9px] sm:text-xs font-bold text-swamp-green">
          Video Presentation
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
        <p className="text-[9px] sm:text-xs text-gray-600">
          Video Title:
        </p>

        <p className="pt-1 text-[9px] sm:text-xs text-gray-500">
          {videoTitle}
        </p>
      </div>

      <div className="min-h-0 flex-1 pt-4">
        <video
          controls
          className="h-full min-h-40 w-full rounded-2xl bg-[#303030] object-cover"
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoPresentation;