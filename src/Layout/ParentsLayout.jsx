import { useState } from "react";
import { Outlet } from "react-router-dom";
import ParentsHeader from "../Components/ParentsHeader";
import ParentsSidebar from "../Components/ParentsSidebar";
import Copyright from "../Components/Copyright";

const ParentsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col justify-between">
      <ParentsHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      <ParentsSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 justify-center bg-linear-to-b from-[#f3f8f1] via-[#e8f1e3] to-[#d9e8d2] font-[Poppins] text-[#0f2419]">
        <Outlet />
      </div>

      <Copyright />
    </div>
  );
};

export default ParentsLayout;
