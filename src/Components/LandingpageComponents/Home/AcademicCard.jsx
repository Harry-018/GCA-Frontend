const AcademicCard = ({ card, image }) => {
  return (
    <div
      className="relative h-80 w-60 shrink-0 snap-center overflow-hidden rounded-2xl p-5 text-bone inset-shadow-med transition-transform duration-300 hover:scale-105 lg:h-90 lg:w-75"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-egg-dark" />
      <div className="relative z-10 flex h-full flex-col justify-end gap-y-2">
        <span className="inline-block w-fit rounded-full bg-swamp-green/40 px-2 py-0.5 text-xs backdrop-blur-sm lg:text-[13px]">
          {card.ages} Years Old
        </span>

        <h2 className="font-[PoppinsBold] text-base leading-tight lg:text-xl">
          {card.program}
        </h2>

        <p className="min-h-20 text-xs lg:text-sm">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default AcademicCard;