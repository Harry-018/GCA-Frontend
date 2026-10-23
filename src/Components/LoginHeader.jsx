import { Home, GraduationCap, LogIn, Menu } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logoImg from "../assets/logowbg.png";
import { useState, useEffect } from "react";

import { getSchoolInformation } from "../requests/settingsRequests.js";

const SCHOOL = {
  name: "Grace Christian Academy",
  fullName: "Grace Christian Academy Cavite Inc.",
};

const LoginHeader = ({ onMenuToggle }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

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

        {/*sidebar*/}
        <div className="hidden items-center gap-x-5 md:gap-x-8 lg:flex lg:gap-x-10">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-x-2 font-[PoppinsBold] tracking-wide transition-colors duration-300 ${
                isActive
                  ? "text-bone hover:text-swamp-green"
                  : "text-bone hover:text-swamp-green"
              }`
            }
          >
            <Home size={20} />
            <span className="hidden sm:inline">HOME</span>
          </NavLink>

          <NavLink
            to="/admission"
            className={({ isActive }) =>
              `flex items-center gap-x-2 font-[PoppinsBold] tracking-wide transition-colors duration-300 ${
                isActive
                  ? "text-bone hover:text-swamp-green"
                  : "text-bone hover:text-swamp-green"
              }`
            }
          >
            <GraduationCap size={20} />
            <span className="hidden sm:inline">ADMISSION</span>
          </NavLink>

          {!isLoginPage && (
            <NavLink
              to="/login"
              className="flex items-center gap-x-2 rounded-lg border border-lime-green px-3 py-1.5 text-2xs font-[PoppinsBold] tracking-wide text-lime-green transition-colors duration-300 hover:bg-lime-green hover:text-[#0c2423] sm:text-xs"
            >
              <LogIn size={16} className="shrink-0" />
              <span className="hidden sm:inline">Login</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LoginHeader;
