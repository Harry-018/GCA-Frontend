import { Bus, CheckCircle, Home, Mail, MapPin, Phone, School } from "lucide-react";
import { NavLink } from "react-router-dom";

const QUICK_LINKS = [
  { label: "HOME", path: "/", icon: Home },
  { label: "TRANSPORT", path: "/transport", icon: Bus },
  { label: "TUITION", path: "/tuition", icon: School },
  { label: "ADMISSION", path: "/admission", icon: CheckCircle },
];

const Footer = () => {
  return (
    <footer className="w-full overflow-hidden bg-[#062421] px-5 py-5 font-[Poppins] text-bone sm:px-6 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-Handmade text-3xl leading-none text-lime-green">
              Grace Christian Academy
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-bone/65">
              Growing joyful learners through faith, character, and meaningful discovery.
            </p>
          </div>

          <nav className="flex flex-col gap-2 font-[PoppinsBold] uppercase tracking-wider text-bone/75">
            <div className="flex flex-row flex-wrap items-center gap-2">
              {QUICK_LINKS.slice(0, 3).map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex w-fit items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px] transition-colors hover:bg-white/20 hover:text-lime-green"
                  >
                    <Icon className="h-3 w-3 shrink-0 text-lime-green" />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>

            <div className="flex flex-row flex-wrap items-center gap-2">
              {QUICK_LINKS.slice(3).map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex w-fit items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[9px] transition-colors hover:bg-white/20 hover:text-lime-green"
                  >
                    <Icon className="h-3 w-3 shrink-0 text-lime-green" />
                    {link.label}
                  </NavLink>
                );
              })}

              <NavLink
                to="/enrollmentform"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex w-fit items-center gap-1.5 rounded-lg bg-lime-green px-3 py-1.5 text-2xs font-[PoppinsBold] uppercase tracking-wider text-[#062421] transition-colors hover:bg-lime-green/80"
              >
                Enroll Now
              </NavLink>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-[PoppinsBold] text-sm uppercase tracking-[0.2em] text-lime-green">
            Contact Us
          </h2>

          <div className="flex flex-col gap-6 text-xs text-bone/75">
            <a href="tel:09926418526" className="flex items-start gap-3 transition-colors hover:text-lime-green">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime-green" />
              <span>0992-641-8526</span>
            </a>
            <a href="mailto:grace.cslife@gmail.com" className="flex items-start gap-3 break-all transition-colors hover:text-lime-green">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lime-green" />
              <span>grace.cslife@gmail.com</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-green" />
              <span>306, Purok 4, Barangay Cabuco, Trece Martires, Philippines, 4109</span>
            </div>
            <a href="https://www.facebook.com/profile.php?id=100094183517001" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-lime-green">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-lime-green">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Follow us on Facebook</span>
            </a>
          </div>
        </div>

        <div className="flex min-h-35 flex-col justify-between rounded-2xl border border-bone/15 bg-white/5 p-5 sm:col-span-2 lg:col-span-1">
          <div>
            <p className="font-[PoppinsBold] text-sm uppercase tracking-[0.2em] text-lime-green">
              Visit Our Campus
            </p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-bone/65">
              A safe and welcoming space where every child is encouraged to learn and grow.
            </p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Grace+Christian+Academy+306+Purok+4+Barangay+Cabuco+Trece+Martires+Cavite"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-fit rounded-full border border-lime-green/50 px-4 py-2 text-2xs font-[PoppinsBold] uppercase tracking-wider text-lime-green transition-colors hover:bg-lime-green hover:text-[#062421]"
          >
            View Location
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl justify-center border-t border-bone/10 pt-5">
        <p className="whitespace-normal text-center text-[8px] leading-relaxed font-[PoppinsBold] tracking-normal text-bone/45 sm:text-[9px] sm:tracking-wider">
          ALL RIGHTS RESERVED GRACE CHRISTIAN ACADEMY © 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;