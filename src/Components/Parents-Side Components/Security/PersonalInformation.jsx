import { Mail, MapPin, Phone, UserRound } from "lucide-react";

const PersonalInformation = ({ fullName, contactNo, email, address }) => {
  const [lastName, firstName] = fullName.split(",").map((part) => part.trim());

  const details = [
    {
      label: "Contact No. :",
      value: contactNo,
    },
    {
      label: "Email:",
      value: email,
    },
    {
      label: "Address:",
      value: address || "No address provided",
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#0c2423] font-[Poppins] shadow-lg">
      <div className="flex flex-col gap-7 bg-linear-to-br from-[#0c2423] via-[#123b35] to-[#279257] px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-swamp-green ring-1 ring-white/20 sm:size-14">
            <UserRound size={26} strokeWidth={1.5} />
          </div>
          <div>
            <p className="py-1 text-[9px] font-[PoppinsBold] uppercase tracking-widest text-swamp-green sm:text-2xs sm:tracking-[0.18em]">
              Personal information
            </p>
            <p className="font-[PoppinsBold] text-lg uppercase leading-tight text-white sm:text-2xl">
              {lastName}
            </p>
            <p className="py-1 text-xs font-[Poppins] font-medium tracking-wide text-white/75 sm:text-base">
              {firstName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-white/15 pt-5 sm:grid-cols-2 sm:gap-6 lg:min-w-124 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {details.map((detail) => (
            <div key={detail.label} className={`flex min-w-0 items-start gap-3 ${detail.label === "Address:" ? "sm:col-span-2" : ""}`}>
              {detail.label === "Contact No. :" ? (
                <Phone size={16} className="py-0.5 shrink-0 text-swamp-green" />
              ) : detail.label === "Email:" ? (
                <Mail size={16} className="py-0.5 shrink-0 text-swamp-green" />
              ) : (
                <MapPin size={16} className="py-0.5 shrink-0 text-swamp-green" />
              )}
              <div className="min-w-0">
                <p className="text-2xs font-[Poppins] font-medium uppercase tracking-wide text-white/60">
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
