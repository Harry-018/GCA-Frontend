import React from "react";

const TuitionBanner = ({
  title = "TUITION FEES",
  description = "The tuition fees listed above represent the basic breakdown only. Actual costs may vary per student depending on any additional services or miscellaneous fees applied during enrollment.",
  backgroundImage = "/images/tuition-banner.jpg",
}) => {
  return (
    <div className="relative flex min-h-36 flex-col justify-start overflow-hidden rounded-xl px-4 pt-5 pb-6 text-white sm:min-h-52 sm:px-10 sm:pt-8 sm:pb-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `linear-gradient(170deg, rgba(40,44,42,.4), rgba(28,30,29,.88)), url("${backgroundImage}")`,
          filter: "blur(5px)",
          transform: "scale(1.05)",
        }}
      />
      <div className="relative flex flex-col gap-10">
        <h2 className="font-[PoppinsBold] text-2xl sm:text-4xl">
          {title}
        </h2>
        <p className="text-[9px] leading-relaxed text-white/90 md:text-sm">
          <span className="font-[PoppinsBold]">Disclaimer:</span>{" "}
          {description}
        </p>
      </div>
    </div>
  );
};

export default TuitionBanner;