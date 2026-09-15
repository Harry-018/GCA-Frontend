import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/uAdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen gap-8 bg-[#ebe9e4] px-4 py-4 font-[Poppins]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
