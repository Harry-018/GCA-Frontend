import { useState } from "react";
import { Outlet } from "react-router-dom";
import ParentsHeader from "../Components/ParentsHeader";
import ParentsSidebar from "../Components/ParentsSidebar";
import Copyright from "../Components/Copyright";

const ParentsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col justify-between print:block print:min-h-0">
      <div className="print:hidden">
        <ParentsHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="print:hidden">
        <ParentsSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 justify-center bg-egg font-[Poppins] text-[#0f2419] print:block print:bg-white">
        <Outlet />
      </div>

      <div className="print:hidden">
        <Copyright />
      </div>
    </div>
  );
};

export default ParentsLayout;
