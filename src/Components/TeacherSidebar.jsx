import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarCheck,
  CalendarDays,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import logoImg from "../assets/logowbg.png";
import authStore from "../stores/authStore";
import { getSchoolInformation } from "../requests/settingsRequests";

const SCHOOL = {
  name: "Grace Christian Academy",
};

const NAV_LINKS = [
  { to: "/teacher", label: "DASHBOARD", icon: LayoutDashboard, end: true },
  { to: "/teacher/attendance", label: "ATTENDANCE", icon: CalendarCheck },
  { to: "/teacher/grades", label: "GRADES", icon: ClipboardList },
  { to: "/teacher/weekly-schedule", label: "SCHEDULE", icon: CalendarDays },
  { to: "/teacher/security", label: "ACCOUNT SETTINGS", icon: Settings },
];

const TeacherSidebar = ({ open, onClose }) => {
  const [schoolinfo, setSchoolinfo] = useState({
    school_name: SCHOOL.name,
    school_logo: logoImg,
  });

  const navigate = useNavigate();

  const logout = authStore((state) => state.logout);
  const user = authStore((state) => state.user);

  useEffect(() => {
    let cancelled = false;

    const loadSchoolInformation = async () => {
      try {
        const response = await getSchoolInformation();
        const schoolInformation = response?.data ?? response;

        if (!cancelled && schoolInformation) {
          setSchoolinfo({
            school_name: schoolInformation.school_name || SCHOOL.name,
            school_logo: schoolInformation.school_logo || logoImg,
          });
        }
      } catch (error) {
        console.error("Failed to load school information:", error);
      }
    };

    loadSchoolInformation();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-60 flex-col bg-[#0c2423] font-[Poppins] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* School Information */}
        <div className="flex items-center gap-x-2 border-b border-white/10 px-5 py-5">
          <img
            src={schoolinfo.school_logo}
            alt={schoolinfo.school_name}
            className="h-9 rounded-full"
          />

          <span className="font-[PoppinsBold] text-xs text-bone">
            {schoolinfo.school_name}
          </span>
        </div>

        {/* Teacher Information */}
        <div className="border-b border-white/10 px-5 py-4">
          <p className="truncate font-[PoppinsBold] text-[11px] text-white lg:text-xs xl:text-sm">
            {user?.full_name || "Teacher"}
          </p>

          <p className="text-[9px] text-gray-400 sm:text-xs">
            {user?.role === "teacher" ? "Teacher Account" : user?.role || ""}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4">
          {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-x-3 rounded-lg px-3 py-3 text-[11px] font-[PoppinsBold] tracking-wide transition-colors lg:text-xs xl:text-sm ${
                  isActive
                    ? "bg-swamp-green/20 text-swamp-green"
                    : "text-gray-400 hover:bg-bone/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 px-3 py-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-x-3 rounded-lg px-3 py-3 text-[11px] font-[PoppinsBold] text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 lg:text-xs xl:text-sm"
          >
            <LogOut size={18} />
            LOG OUT
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;
