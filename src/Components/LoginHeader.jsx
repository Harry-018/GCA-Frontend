import { Home, GraduationCap, LogIn, Menu, MessageCircle } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logoImg from "../assets/logowbg.png";
import { useState, useEffect } from "react";
import { useParentInquiry } from "./ParentInquiryProvider.jsx";

import { getSchoolInformation } from "../requests/settingsRequests.js";

const SCHOOL = {
  name: "",
  fullName: "",
};

const LoginHeader = ({ onMenuToggle }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { openInquiry } = useParentInquiry();

  const [schoolinfo, setSchoolinfo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSchoolInformation = async () => {
      try {
        const response = await getSchoolInformation();

        if (isMounted) {
          setSchoolinfo(response?.data ?? response);
        }
      } catch (error) {
        console.error("Failed to load school information:", error);
      }
    };

    fetchSchoolInformation();

    return () => {
      isMounted = false;
    };
  }, []);

  const schoolName = schoolinfo?.school_name || "Grace Christian Academy";
  const schoolLogo = schoolinfo?.school_logo || logoImg;

  return (
    <header className="sticky top-0 z-50 font-[Poppins]">
      <nav className="flex h-16 w-full items-center justify-between bg-[#0c2423] px-4 text-xs inset-shadow-med sm:h-20 sm:px-10">
        <div className="flex min-w-0 items-center gap-x-2 sm:gap-x-4">
          {onMenuToggle && (
            <button
              type="button"
              onClick={onMenuToggle}
              className="shrink-0 text-bone hover:text-swamp-green lg:hidden"
            >
              <Menu size={22} />
            </button>
          )}

          <Link to="/" className="flex min-w-0 items-center gap-x-2">
            <img
              src={schoolLogo}
              alt={SCHOOL.name}
              className="h-7 rounded-full sm:h-8 lg:h-10"
            />

            <div className="min-w-0">
              <p className="hidden whitespace-nowrap text-[7px] tracking-widest text-gray-200 sm:block sm:text-[9px] sm:tracking-[0.15em] lg:text-2xs lg:tracking-[0.18em]">
                {schoolName} Cavite Inc.
              </p>

              <p className="whitespace-nowrap font-[PoppinsBold] text-[9px] text-bone sm:text-[11px] lg:text-xs">
                {schoolName}
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-x-5 md:gap-x-6 lg:flex lg:gap-x-8">
          <NavLink
            to="/"
            end
            className="flex items-center gap-x-2 font-[PoppinsBold] tracking-wide text-bone transition-colors duration-300 hover:text-swamp-green"
          >
            <Home size={20} />
            <span>HOME</span>
          </NavLink>

          <NavLink
            to="/admission"
            className="flex items-center gap-x-2 font-[PoppinsBold] tracking-wide text-bone transition-colors duration-300 hover:text-swamp-green"
          >
            <GraduationCap size={20} />
            <span>ADMISSION</span>
          </NavLink>

          {!isLoginPage && (
            <NavLink
              to="/login"
              aria-label="Log in"
              className="group flex items-center gap-x-2 rounded-full border border-bone/25 bg-bone/5 px-4 py-2 text-2xs font-[PoppinsBold] tracking-wide text-bone shadow-sm transition-all duration-300 hover:border-lime-green/70 hover:bg-bone/10 hover:text-lime-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-green sm:text-xs"
            >
              <LogIn
                size={16}
                className="shrink-0 text-lime-green transition-transform duration-300 group-hover:translate-x-0.5"
              />
              <span>Login</span>
            </NavLink>
          )}

        </div>

        <button
          type="button"
          onClick={openInquiry}
          aria-label="Parent Inquiry - Ask Us"
          title="Parent Inquiry"
          className="fixed bottom-6 right-5 z-60 flex h-12 items-center gap-2 rounded-xl bg-parent-green px-5 text-bone shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 sm:bottom-8 sm:right-8"
        >
          <MessageCircle size={20} className="shrink-0" />
          <span className="whitespace-nowrap text-xs font-[PoppinsBold] tracking-wide">
            ASK US
          </span>
        </button>
      </nav>
    </header>
  );
};

export default LoginHeader;
