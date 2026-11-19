import React from "react";

const TuitionBanner = ({
  title = "TUITION FEES",
  description = "The tuition fees listed above represent the basic breakdown of the school's standard charges for each grade level. However, the total amount may vary depending on the student's selected payment option, additional services, and other applicable miscellaneous fees during enrollment. Parents and guardians are encouraged to review the complete assessment of fees provided by the school administration to ensure they are fully informed of the total amount payable. For further clarification regarding tuition costs, payment arrangements, or additional charges, please feel free to contact the school office for assistance.",
  backgroundImage = "/images/tuition-banner.jpg",
}) => {
  return (
    <div className="relative flex h-44 w-full flex-col justify-between overflow-hidden rounded-xl px-4 py-4 text-white sm:h-48 sm:px-10 sm:py-6 md:h-56">
      <div
        className="absolute -inset-2 bg-cover bg-center blur-sm"
        style={{
          backgroundImage:
            `linear-gradient(170deg, rgba(40,44,42,.4), rgba(28,30,29,.88)), url("${backgroundImage}")`,
        }}
      />
      <div className="relative flex flex-col gap-4 sm:gap-6">
        <h2 className="font-[PoppinsBold] text-2xl uppercase sm:text-4xl">
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