
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  GraduationCap,
  Users,
  Bell,
  Globe,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import logo from "../assets/logowbg.png";

const MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin", end: true },
  { label: "Admission", icon: UserPlus, path: "/admin/admission" },
  { label: "Academic Management", icon: GraduationCap, path: "/admin/academic" },
  { label: "User Accounts", icon: Users, path: "/admin/user-account" },
  { label: "Notifications", icon: Bell, path: "/admin/notifications" },
  { label: "Website Management", icon: Globe, path: "/admin/website" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const ADMISSION_PATHS = [
  "/admin/admission",
  "/admin/submission",
];

const MobileBrand = () => {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
      <img
        src={logo}
        alt="Grace Christian Academy"
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />

      <span className="font-[PoppinsBold] text-xs text-bone">
        Grace Christian Academy
      </span>
    </div>
  );
};

// Admin account information
const MobileAccount = () => {
  return (
    <div className="border-b border-white/10 px-5 py-4">
      <p className="truncate font-[PoppinsBold] text-[11px] text-white">
        ADMIN ACCOUNT
      </p>

      <p className="text-[9px] text-gray-400">
        Administrator
      </p>
    </div>
  );
};

// Single navigation link
const MobileNavLink = ({ item, active, onNavigate }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={onNavigate}
      className={`
        flex items-center gap-x-3 rounded-lg px-3 py-3
        text-[11px] font-[PoppinsBold] tracking-wide
        transition-colors
        ${
          active
            ? "bg-swamp-green/20 text-swamp-green"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <Icon size={18} />
      {item.label.toUpperCase()}
    </NavLink>
  );
};

// Navigation menu
const MobileMenu = ({ onNavigate }) => {
  const { pathname } = useLocation();

  const isActive = (item) => {
    if (item.label === "Admission") {
      return ADMISSION_PATHS.includes(pathname);
    }

    if (item.end) {
      return pathname === item.path;
    }

    return (
      pathname === item.path ||
      pathname.startsWith(`${item.path}/`)
    );
  };

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {MENU_ITEMS.map((item) => (
        <MobileNavLink
          key={item.path}
          item={item}
          active={isActive(item)}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
};

// Logout button
const MobileLogout = ({ onNavigate }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onNavigate?.();
    navigate("/login");
  };

  return (
    <div className="border-t border-white/10 px-3 py-3">
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-x-3 rounded-lg px-3 py-3 text-[11px] font-[PoppinsBold] text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
      >
        <LogOut size={18} />
        LOG OUT
      </button>
    </div>
  );
};

// Main mobile sidebar
const AdminMobileSidebar = ({ open = false, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-full w-60
          flex-col bg-[#0c2423] font-[Poppins]
          transition-transform duration-300 lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <MobileBrand />
        <MobileAccount />

        <MobileMenu 
            onNavigate={onClose} 
        />

        <MobileLogout 
            onNavigate={onClose} 
        />
      </aside>
    </>
  );
};

export default AdminMobileSidebar;