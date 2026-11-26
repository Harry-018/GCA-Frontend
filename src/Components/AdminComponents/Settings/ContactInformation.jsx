import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactInformation = ({
  contactNo = "+63-992-641-8081",
  emailAddress = "grace.cslife@gmail.com",
  schoolAddress = "306, Purok 4, Barangay Cabuco, Trece Martires, Philippines, 4109",
  onEdit,
}) => {
  const items = [
    { icon: Phone, label: "Contact No.", value: contactNo },
    { icon: Mail, label: "Email Address", value: emailAddress },
    { icon: MapPin, label: "School Address", value: schoolAddress },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-bone p-5 shadow-sm ring-1 ring-parent-accent/10 sm:p-6">
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-4 top-4 rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
      >
        Edit
      </button>

      <span className="font-[PoppinsBold] text-xs uppercase tracking-[0.25em] text-parent-green/70">
        Contact Information
      </span>
      <h2 className="mt-3 max-w-md font-[SuperJoyful] text-3xl leading-tight text-parent-green sm:text-4xl">
        Get In Touch
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-parent-accent/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-parent-pale/60 text-parent-green">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-[PoppinsBold] uppercase tracking-wide text-gray-400">{label}</p>
              <p className="mt-1 wrap-break-word text-sm text-egg-dark">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInformation;