import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const MainBanner = ({
  schoolYear,
  admissionStatus,
  title,
  quote,
  backgroundImage,
}) => {
  return (
    <div
      className="relative flex min-w-0 flex-col items-center justify-between overflow-hidden rounded-2xl bg-cover bg-center px-5 py-6 text-center sm:px-8 sm:py-7 lg:px-14 lg:py-6"
      style={{
        backgroundImage: `linear-gradient(165deg, rgba(30,35,30,.40) 0%, rgba(42,42,39,.68) 50%, rgba(50,50,45,.82) 100%), url('${backgroundImage}')`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-white/5" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/5 -translate-x-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1 font-[PoppinsBold] text-2xs uppercase tracking-widest text-white backdrop-blur-sm sm:text-[11px]">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Admission Now {admissionStatus}
        </span>

        <h1 className="max-w-145 font-Handmade text-[22px] font-bold uppercase leading-[1.1] text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-[34px]">
          {title}
        </h1>

        <p className="max-w-110 border-l-2 border-white/25 pl-3 text-left font-Handpicked-seashells text-xs leading-relaxed text-white/85 sm:text-sm lg:max-w-120">
          {quote}
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-1 sm:gap-6">
        <div className="flex items-center gap-2 text-2xs font-[PoppinsBold] uppercase tracking-wide text-white/80 sm:text-[11px]">
          <CalendarDays className="h-3.5 w-3.5 opacity-70" />
          <span className="whitespace-nowrap">S.Y. {schoolYear}</span>
        </div>

        <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
        {admissionStatus === "Open" && (
          <Link
            to="email-verification"
            className="group/btn inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-lime-dark px-5 py-2.5 text-[11px] font-[PoppinsBold] uppercase tracking-wide text-white shadow-lg shadow-lime-dark/25 transition-all duration-200 hover:scale-[1.03] hover:bg-swamp-green hover:shadow-lime-dark/40 sm:text-xs"
          >
            Enroll Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainBanner;
