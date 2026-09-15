import { ArrowUpRight, HeartPulse } from "lucide-react";

const EmergencyContact = ({
  fullName,
  contactNo,
  relationship,
  onManage,
}) => {
  const contactDetails = [
    {
      label: "Full Name:",
      value: fullName,
    },
    {
      label: "Contact No. :",
      value: contactNo,
    },
    {
      label: "Relation to Student:",
      value: relationship,
    },
  ];

  return (
    <div className="h-full w-full rounded-2xl border border-[#0c2423]/10 bg-bone px-5 py-5 shadow-sm sm:px-7 sm:py-6">
      <div className="flex h-full flex-col justify-start gap-6">
        <div className="flex min-h-14 items-start justify-between gap-2 max-[374px]:gap-1">
          <div className="flex min-w-0 items-center gap-3 max-[374px]:gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-swamp-green/15 text-swamp-green">
              <HeartPulse size={19} className="text-red-900" />
            </div>
            <div>
              <p className="text-[9px] font-[PoppinsBold] uppercase tracking text-swamp-green sm:text-2xs sm:tracking-[0.15em]">
                Student safety
              </p>
              <h2 className="py-1 text-xs font-[PoppinsBold] uppercase leading-tight text-[#0c2423] max-[374px]:whitespace-nowrap sm:text-base">
                Emergency contact
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onManage}
            className="flex shrink-0 items-center gap-1 text-[9px] font-[PoppinsBold] uppercase tracking-wide text-swamp-green transition-colors hover:text-lime-dark sm:text-2xs"
          >
            Manage
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-[#0c2423]/10 pt-5 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
          {contactDetails.map((detail) => (
            <div
              key={detail.label}
              className={`flex min-w-0 flex-col gap-1 
                ${detail.label === "Relation to Student:" ? "lg:col-span-2 xl:col-span-1" : ""}`}
            >
              <p className="whitespace-nowrap text-2xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm">
                {detail.label}
              </p>

              <p className={`text-[#0c2423] 
                ${detail.label === "Full Name:" ? "whitespace-nowrap text-[11px]" : "wrap-break-word text-xs"} font-[Poppins] sm:whitespace-nowrap sm:text-sm`}>
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
