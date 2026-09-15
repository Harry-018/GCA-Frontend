import React from "react";

const AdmissionBanner = ({
  title = "ADMISSION",
  description = "Admission requirements and procedures may vary depending on the student's grade level and enrollment status. Please make sure to prepare and submit all required documents within the given schedule. If you would like to proceed with the admission process, kindly visit the school on your selected schedule and coordinate with the school office for verification and further assistance. Thank you!",
  backgroundImage = "/image/app2.webp",
}) => {
  return (
    <div className="relative flex min-h-36 flex-col justify-start overflow-hidden rounded-xl px-4 pt-5 pb-6 text-white sm:min-h-52 sm:px-10 sm:pt-8 sm:pb-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(170deg, rgba(40,44,42,.4), rgba(28,30,29,.88)), url('${backgroundImage}')`,
          filter: "blur(5px)",
          transform: "scale(1.05)",
        }}
      />
      <div className="relative flex flex-col gap-10">
        <h2 className="font-[PoppinsBold] text-2xl sm:text-4xl">
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