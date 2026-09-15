import { useState } from "react";
import {
  User,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  Menu,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logowbg.png";
import authStore from "../stores/authStore";

const SCHOOL = {
  name: "Grace Christian Academy",
  fullName: "Grace Christian Academy Cavite Inc.",
};

const USER = {
  name: "ROMASANTA, ROSALINE M.",
  role: "Parent Account",
};

const ParentsHeader = ({ onMenuToggle }) => {
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();
  const logout = authStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    setUserMenu(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 font-[Poppins]">
      {userMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenu(false)}
        />
      )}

      <nav className="relative z-50 flex h-16 w-full items-center justify-between bg-[#0c2423] px-4 text-xs inset-shadow-med sm:h-20 sm:px-10">
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <button
            type="button"
            onClick={onMenuToggle}
            className="text-bone hover:text-swamp-green lg:hidden"
          >
            <Menu size={22} />
          </button>

          <Link to="/parents" className="flex min-w-0 items-center gap-x-2">
            <img
              src={logoImg}
              alt={SCHOOL.name}
              className="h-7 rounded-full sm:h-8 lg:h-10"
            />

            <div className="min-w-0">
              <p className="whitespace-nowrap text-[7px] tracking-widest text-gray-200 sm:text-[9px] sm:tracking-[0.15em] lg:text-2xs lg:tracking-[0.18em]">
                {SCHOOL.fullName}
              </p>

              <p className="whitespace-nowrap font-[PoppinsBold] text-[9px] text-bone sm:text-[11px] lg:text-xs">
                {SCHOOL.name}
              </p>
            </div>
          </Link>
        </div>

        {/* Right: Nav links + Profile */}
        <div className="flex items-center gap-x-5 sm:gap-x-8 lg:gap-x-10">
          <div className="hidden items-center gap-x-5 lg:flex lg:gap-x-8 xl:gap-x-10">
            <NavLink
              to="/parents"
              end
              className={({ isActive }) =>
                `flex items-center gap-x-2 font-[Poppins] tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "font-[PoppinsBold] border-b-2 border-swamp-green pb-1 text-swamp-green"
                    : "text-bone hover:text-swamp-green"
                }`
              }
            >
              <LayoutDashboard size={20} />
              <span className="font-[PoppinsBold]">DASHBOARD</span>
            </NavLink>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenu((prev) => !prev)}
              className="flex items-center gap-x-2 text-bone transition-colors duration-300 hover:text-swamp-green"
            >
              <User size={20} className="hidden lg:block" />
              <span className="hidden font-[PoppinsBold] lg:inline">
                {USER.name}
              </span>

              <ChevronDown
                size={18}
                className={`hidden transition-transform duration-200 lg:block ${
                  userMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {userMenu && (
              <div className="absolute right-0 top-full py-2 w-44 sm:w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                <div className="border-b border-gray-100 px-3 py-3 sm:px-4 sm:py-4">
                  <p className="font-[PoppinsBold] text-[11px] text-gray-800 sm:text-sm">
                    {USER.name}
                  </p>

                  <p className="py-1 text-[9px] text-gray-400 sm:text-[11px]">
                    {USER.role}
                  </p>
                </div>

                <NavLink
                  to="/parents/security"
                  onClick={() => setUserMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-x-2.5 px-3 py-2.5 text-[11px] transition-colors sm:gap-x-3 sm:px-4 sm:py-3 sm:text-sm ${
                      isActive
                        ? "bg-green-50 text-swamp-green"
                        : "text-gray-600 hover:bg-bone hover:text-swamp-green"
                    }`
                  }
                >
                  <ShieldCheck size={15} />
                  <span>Account Settings</span>
                </NavLink>

                <div className="border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-x-2.5 px-3 py-2.5 text-[11px] text-red-500 transition-colors hover:bg-red-50 sm:gap-x-3 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <LogOut size={15} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ParentsHeader;
