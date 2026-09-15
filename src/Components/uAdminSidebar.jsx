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
} from "lucide-react";
import logo from "../assets/logowbg.png";
import authStore from "../stores/authStore";

const MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Admission", icon: UserPlus, path: "/admin/admission" },
  {
    label: "Academic Management",
    icon: GraduationCap,
    path: "/admin/academic",
  },
  { label: "User Accounts", icon: Users, path: "/admin/users" },
  { label: "Notifications", icon: Bell, path: "/admin/notifications" },
  { label: "Website Management", icon: Globe, path: "/admin/website" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const ADMISSION_PATHS = ["/admin/admission", "/admin/submission"];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = authStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col gap-5">
      <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
        <h1 className="text-2xs font-medium text-gray-700 lg:text-xs">
          Grace Christian Academy
        </h1>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex flex-1 flex-col rounded-2xl border border-gray-200 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
        <nav className="flex flex-col gap-4">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-left text-[9px] font-[Poppins] transition lg:px-6 lg:text-xs ${
                    (item.path === "/admin/admission" &&
                      ADMISSION_PATHS.includes(pathname)) ||
                    (item.path !== "/admin/admission" && isActive)
                      ? "bg-[#9caf7b] text-white"
                      : "text-gray-600 hover:bg-[#e9eddc]"
                  }`
                }
              >
                <Icon size={14} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 rounded-full bg-red-50 px-7 py-3 text-left text-xs font-medium text-red-400 transition hover:bg-red-100 hover:text-red-500"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
