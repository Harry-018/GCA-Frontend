import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SideBanner = ({ image, title, subtitle, icon: Icon, arrow = "right", to }) => {
  const content = (
    <>
      <div className="absolute inset-0 bg-linear-to-b transition-opacity duration-300 group-hover:opacity-75" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
        
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-swamp-green/25 backdrop-blur-md transition-colors duration-300 group-hover:bg-swamp-green/40">
          {Icon && <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />}
        </div>
        <span className="font-Handmade text-xl font-bold uppercase tracking-wide text-white drop-shadow-lg sm:text-2xl">
          {title}
        </span>

        <span className="text-2xs font-[PoppinsBold] uppercase tracking-widest text-white/70">
          {subtitle}
        </span>

        {arrow === "left" ? (
          <ArrowLeft className="mt-1 h-4 w-4 text-white/50 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-white/90" />
        ) : (
          <ArrowRight className="mt-1 h-4 w-4 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/90" />
        )}
      </div>
    </>
  );

  const className =
    "group relative hidden overflow-hidden rounded-2xl bg-cover bg-center lg:flex";

  if (to) {
    return (
      <Link
        to={to}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={className}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(20,30,29,.15), rgba(20,30,29,.55)), url('${image}')`,
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={className}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(20,30,29,.15), rgba(20,30,29,.55)), url('${image}')`,
      }}
    >
      {content}
    </div>
  );
};

export default SideBanner;