const HymnSection = ({ title, videoSrc }) => {
  return (
    <div className="flex w-full flex-col items-center px-5 py-8">
      <h2 className="text-center font-Handpicked-seashells font-bold uppercase text-lg leading-tight text-swamp-green sm:text-xl md:text-2xl">
        {title}
      </h2>

      <div className="w-full max-w-3xl py-8">
        <video
          className="aspect-video w-full rounded-2xl object-cover shadow-lg"
          controls
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HymnSection;