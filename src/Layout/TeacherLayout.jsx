import { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherHeader from "../Components/TeacherHeader";
import TeacherSidebar from "../Components/TeacherSidebar";
import Copyright from "../Components/Copyright";

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <TeacherHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      <TeacherSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 justify-center bg-egg font-[Poppins] text-egg-dark lg:flex lg:min-h-0 lg:flex-col lg:justify-start">
        <Outlet />
      </div>

      <Copyright />
    </div>
  );
};

export default TeacherLayout;
