import { useState, React } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "../Components/uAdminSidebar";
import logo from "../assets/logowbg.png";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen gap-8 overflow-hidden bg-[#ebe9e4] px-4 py-4 font-[Poppins]">
      <header className="fixed left-0 top-0 z-30 flex h-14 w-full items-center gap-x-3 bg-[#0c2423] px-4 shadow-lg lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="-ml-1 text-bone transition hover:text-swamp-green"
        >
          <Menu size={22} />
        </button>

        <img src={logo} alt="Logo" className="h-7 rounded-full object-cover" />

        <span className="font-[PoppinsBold] text-[11px] text-bone">
          Grace Christian Academy
        </span>
      </header>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-14 lg:pl-52 lg:pt-0 xl:pl-0">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
