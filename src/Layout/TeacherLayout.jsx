import { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherHeader from "../Components/TeacherHeader";
import TeacherSidebar from "../Components/TeacherSidebar";
import Copyright from "../Components/Copyright";

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col justify-between">
      <TeacherHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      <TeacherSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex w-full min-w-0 flex-1 flex-col bg-egg font-[Poppins] text-egg-dark lg:min-h-0">
        <Outlet />
      </div>

      <Copyright />
    </div>
  );
};

export default TeacherLayout;
