const Mission = ({
  image = "/image/bb.webp",
  overlay = "/image/90.webp",
  label = "Our Mission",
  title = "Raising Godly and Lifelong Learners",
  description = "",
  onEdit,
}) => {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-egg px-5 pb-12 pt-12 shadow-sm sm:px-10 lg:px-16 lg:pb-16 lg:pt-16">
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-4 top-4 z-30 rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
      >
        Edit
      </button>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-lg py-8 lg:mx-0">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-swamp-green/20 sm:-right-14 sm:-top-14 sm:h-60 sm:w-60" />
          <div className="absolute -left-2 top-8 h-[calc(100%-2rem)] w-[calc(85%+1rem)] rounded-[4rem] border border-swamp-green sm:-left-4 sm:top-10 sm:rounded-[5rem]" />

          <div className="relative z-10 mb-8 ml-10 aspect-[1.45/1] w-[85%] overflow-hidden rounded-[3.5rem] border-8 border-white shadow-[0_12px_24px_rgba(19,50,21,0.18)] sm:mb-10 sm:rounded-[4.5rem]">
            <img
              src={image}
              alt="Children learning together"
              loading="lazy"
              className="h-full w-full object-cover brightness-90"
            />
          </div>

          {overlay && (
            <div className="absolute -bottom-6 -right-4 z-20 h-36 w-36 overflow-hidden rounded-4xl border-4 border-white shadow-[0_8px_20px_rgba(19,50,21,0.25)] sm:-right-6 sm:h-44 sm:w-44">
              <img
                src={overlay}
                alt="Additional campus photo"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-5 lg:max-w-xl">
          <span className="font-[PoppinsBold] text-sm uppercase tracking-[0.35em] text-parent-green/80 lg:text-base">
            {label}
          </span>
          <h2 className="max-w-lg font-[SuperJoyful] text-4xl leading-[1.05] text-parent-green sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="max-w-xl font-[Poppins] text-sm leading-relaxed text-egg-dark/75 sm:text-base lg:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
