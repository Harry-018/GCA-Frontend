import { NavLink, useNavigate } from "react-router-dom";
import { Bus, CheckCircle, GraduationCap, Home, LogIn, School, X } from "lucide-react";
import logoImg from "../assets/logowbg.png";

const SCHOOL = {
  name: "Grace Christian Academy",
};

const NAV_LINKS = [
  { to: "/teacher", label: "TEACHER", icon: GraduationCap },
];

const QUICK_LINKS = [
  { to: "/", label: "HOME", icon: Home, end: true },
  { to: "/transport", label: "TRANSPORT", icon: Bus },
  { to: "/tuitionfee", label: "TUITION", icon: School },
  { to: "/admission", label: "ADMISSION", icon: CheckCircle },
];

const HomeSidebar = ({ open, onClose, hideLogin = false }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-60 flex-col bg-[#0c2423] font-[Poppins] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-x-2 border-b border-white/10 px-5 py-5">
          <img
            src={logoImg}
            alt={SCHOOL.name}
            className="h-9 rounded-full"
          />
          <span className="font-[PoppinsBold] text-xs text-bone">
            {SCHOOL.name}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[9px] font-[PoppinsBold] uppercase tracking-[0.2em] text-gray-500">
            Quick Links
          </p>

          {QUICK_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-x-3 rounded-lg px-3 py-3 text-[11px] font-[PoppinsBold] tracking-wide transition-colors ${
                  isActive
                    ? "bg-swamp-green/20 text-swamp-green"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-x-3 rounded-lg px-3 py-3 text-[11px] font-[PoppinsBold] tracking-wide transition-colors ${
                  isActive
                    ? "bg-swamp-green/20 text-swamp-green"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {!hideLogin && (
          <div className="border-t border-white/10 px-3 py-3">
            <button
              type="button"
              onClick={handleLogin}
              className="flex w-full items-center gap-x-3 rounded-lg px-3 py-3 text-[11px] font-[PoppinsBold] text-lime-green transition-colors hover:bg-lime-green/10"
            >
              <LogIn size={18} />
              LOGIN
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default HomeSidebar;
