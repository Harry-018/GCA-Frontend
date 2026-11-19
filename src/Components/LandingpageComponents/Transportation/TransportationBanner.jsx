import React from "react";

const TransportationBanner = ({
  title = "TRANSPORTATION",
  description = "The transportation rates listed above represent the basic fees for the school's standard routes. However, the final transportation cost may vary depending on the student's exact pickup location, distance, and van availability. Parents and guardians are encouraged to coordinate with the school administration to confirm the appropriate route, schedule, and total transportation fee. For further clarification regarding transportation services, pickup arrangements, or additional charges, please feel free to contact the school office for assistance.",
  backgroundImage = "/image/sb1.jpg",
}) => {
  return (
    <div className="relative flex h-44 w-full flex-col justify-between overflow-hidden rounded-xl px-4 py-4 text-bone sm:h-48 sm:px-10 sm:py-6 md:h-56">
      <div
        className="absolute -inset-2 bg-cover bg-center blur-sm"
        style={{
          backgroundImage:
            `linear-gradient(170deg, rgba(40,44,42,.4), rgba(28,30,29,.88)), url('${backgroundImage}')`,
        }}
      />
      <div className="relative flex flex-col gap-4 sm:gap-6">
        <h1 className="font-[PoppinsBold] text-2xl uppercase text-bone sm:text-4xl">
          {title}
        </h1>

        <p className="text-[9px] leading-relaxed text-bone/90 md:text-sm">
          <span className="font-[PoppinsBold]">Note:</span>{" "}
          {description}
        </p>
      </div>
    </div>
  );
};

export default TransportationBanner;