import { useState } from "react";
import { Outlet } from "react-router-dom";
import ParentsHeader from "../Components/ParentsHeader";
import ParentsSidebar from "../Components/ParentsSidebar";
import Copyright from "../Components/Copyright";

const ParentsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <ParentsHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      <ParentsSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 justify-center bg-egg font-[Poppins] text-egg-dark">
        <Outlet />
      </div>

      <Copyright />
    </div>
  );
};

export default ParentsLayout;
