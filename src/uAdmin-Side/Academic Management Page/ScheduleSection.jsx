import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import ScheduleSetupCard from "../../Components/AdminComponents/Academic Management/Schedule/ScheduleSetUpCard";
import { getSections } from "../../utils/data/Admin/sections";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const SCHOOL_YEAR = "2026 - 2027";

const ScheduleSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sections = getSections();
  const level = searchParams.get("level") || Object.keys(sections)[0] || "";

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h1 className="font-[PoppinsBold] text-md text-swamp-green sm:text-lg">
              {level} :
            </h1>

            <span className="whitespace-nowrap font-[Poppins] text-xs text-gray-600 sm:text-sm">
              S.Y {SCHOOL_YEAR}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border bg-white px-4 py-1 font-[Poppins] text-xs text-gray-500 transition hover:text-swamp-green sm:text-sm"
          >
            Go Back
          </button>
        </div>

        {/* Schedule Setup Cards */}
        <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(sections[level] ?? []).map((item) => (
            <ScheduleSetupCard
              key={item.id}
              sectionName={item.section}
              onClick={(name) =>
                navigate(
                  `/admin/academic/setupschedule?level=${encodeURIComponent(
                    level
                  )}&section=${encodeURIComponent(name)}`
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;