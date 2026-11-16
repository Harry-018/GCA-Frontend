import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const ContactInformation = ({ contact, onManage }) => {
  const contactDetails = [
    {
      label: "Address",
      value: contact.address,
    },
    {
      label: "Email",
      value: contact.email,
    },
    {
      label: "Contact No.",
      value: contact.contactNumber,
    },
  ];

  return (
    <div className="h-full w-full rounded-2xl border border-parent-accent/15 bg-bone px-5 py-5 shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-7 sm:py-6">
      <div className="flex h-full flex-col justify-start gap-6">
        <div className="flex min-h-14 items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-parent-green/15 text-parent-green">
              <MapPin size={19} />
            </div>
            <div>
              <p className="text-[9px] font-[PoppinsBold] uppercase tracking-widest text-parent-green sm:text-2xs sm:tracking-[0.15em]">
                Teacher profile
              </p>
              <h2 className="mt-1 text-xs font-[PoppinsBold] uppercase leading-tight text-parent-green sm:text-base">
                Contact information
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onManage}
            className="flex shrink-0 items-center gap-1 text-[9px] font-[PoppinsBold] uppercase tracking-wide text-parent-green transition-colors hover:text-parent-accent sm:text-2xs"
          >
            Manage
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-parent-accent/10 pt-5 lg:grid-cols-2 lg:gap-x-8 xl:grid-cols-3">
          {contactDetails.map((detail) => (
            <div
              key={detail.label}
              className={`flex min-w-0 flex-col gap-1 ${detail.label === "Address" ? "lg:col-span-2 xl:col-span-1" : ""}`}
            >
              <span className="whitespace-nowrap text-2xs uppercase tracking-wide text-gray-500">
                {detail.label}
              </span>

              <span className={`wrap-break-word text-xs font-[Poppins] text-parent-green sm:text-sm ${
                  detail.label === "Address"
                    ? "whitespace-pre-line"
                    : ""
                }`}
              >
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;