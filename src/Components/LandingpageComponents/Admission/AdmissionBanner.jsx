import React from "react";

const AdmissionBanner = ({
  title = "ADMISSION",
  description = "Note: Admission requirements and procedures may vary depending on the student's grade level and enrollment status. Parents and guardians are encouraged to carefully review and prepare all necessary documents before the scheduled submission date to ensure a smooth enrollment process. Please make sure that all required documents are complete and submitted within the given schedule. For further assistance, verification, or clarification regarding admission requirements and procedures, kindly visit the school on your selected schedule and coordinate with the school office. Thank you!",
  backgroundImage = "/image/app2.webp",
}) => {
  return (
    <div className="relative flex h-44 w-full flex-col justify-between overflow-hidden rounded-xl px-4 py-4 text-white sm:h-48 sm:px-10 sm:py-6 md:h-56">
      <div
        className="absolute -inset-2 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `linear-gradient(170deg, rgba(40,44,42,.4), rgba(28,30,29,.88)), url('${backgroundImage}')`,
        }}
      />
      <div className="relative flex flex-col gap-4 sm:gap-6">
        <h2 className="font-[PoppinsBold] text-2xl uppercase sm:text-4xl">
          {title}
        </h2>
        <p className="text-[9px] leading-relaxed text-white/90 md:text-sm">
          <span className="font-[PoppinsBold]">Note:</span>{" "}
          {description}
        </p>
      </div>
    </div>
  );
};

export default AdmissionBanner;