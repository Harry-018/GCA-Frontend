import { Mail, MapPin, Phone, UserRound } from "lucide-react";

const PersonalInformation = ({ fullName, contactNo, email, address }) => {
  const details = [
    {
      label: "Contact No. :",
      value: contactNo || "No contact number provided",
    },
    {
      label: "Email:",
      value: email || "No email provided",
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#0f2419] font-[Poppins] shadow-lg">
      <div className="flex flex-col gap-7 bg-linear-to-br from-[#0f2419] via-[#1c3a28] to-parent-accent px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-bone/10 text-parent-mint ring-1 ring-white/20 sm:size-14">
            <UserRound size={26} strokeWidth={1.5} />
          </div>

          <div>
            <p className="py-1 text-[9px] font-[PoppinsBold] uppercase tracking-widest text-parent-mint sm:text-2xs sm:tracking-[0.18em]">
              Personal information
            </p>

            <p className="font-[PoppinsBold] text-lg uppercase leading-tight text-white sm:text-2xl">
              {fullName || "Parent Name"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-white/15 pt-5 sm:grid-cols-2 sm:gap-6 lg:min-w-124 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {details.map((detail) => (
            <div
              key={detail.label}
              className={`flex min-w-0 items-start gap-3 ${
                detail.label === "Address:" ? "sm:col-span-2" : ""
              }`}
            >
              {detail.label === "Contact No. :" ? (
                <Phone size={16} className="shrink-0 py-0.5 text-parent-mint" />
              ) : detail.label === "Email:" ? (
                <Mail size={16} className="shrink-0 py-0.5 text-parent-mint" />
              ) : (
                <MapPin
                  size={16}
                  className="shrink-0 py-0.5 text-parent-mint"
                />
              )}

              <div className="min-w-0">
                <p className="text-2xs font-[Poppins] uppercase tracking-wide text-white/60">
                  {detail.label}
                </p>

                <p className="wrap-break-word text-xs font-[Poppins] text-white sm:text-sm">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
