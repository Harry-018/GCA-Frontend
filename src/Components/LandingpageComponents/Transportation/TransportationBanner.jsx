import React from "react";

const TransportationBanner = ({
  title = "TRANSPORTATION",
  description = "These rates are based on standard routes. The final transportation fee may vary depending on the exact pickup location and van availability. If you would like to avail of the transportation service, please first visit the school on your selected schedule. Kindly coordinate with the school office for further assistance. Thank You!",
  backgroundImage = "/image/sb1.jpg",
}) => {
  return (
    <div className="relative flex min-h-36 flex-col justify-start overflow-hidden rounded-xl px-4 pt-5 pb-6 text-bone sm:min-h-52 sm:px-10 sm:pt-8 sm:pb-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `linear-gradient(170deg, rgba(40,44,42,.4), rgba(28,30,29,.88)), url('${backgroundImage}')`,
          filter: "blur(5px)",
          transform: "scale(1.05)",
        }}
      />
      <div className="relative flex flex-col gap-10">
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