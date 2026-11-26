const HymnSection = ({ title, videoSrc }) => {
  const correctedTitle = title?.replace(/\bHYMM\b/gi, "HYMN");

  return (
    <div className="flex w-full flex-col items-center px-5 py-8">
      <h2 className="text-center font-[SuperJoyful] text-lg leading-tight text-parent-green uppercase sm:text-xl md:text-4xl">
        {correctedTitle}
      </h2>

      <div className="w-full max-w-7xl py-8">
        <video
          className="aspect-video w-full rounded-2xl object-cover shadow-lg"
          controls
          preload="none"
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HymnSection;
