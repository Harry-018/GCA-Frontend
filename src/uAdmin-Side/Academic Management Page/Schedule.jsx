import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import SectionToolbar from "../../Components/AdminComponents/Academic Management/Section/SectionToolbar";
import SectionCard from "../../Components/AdminComponents/Academic Management/Schedule/SectionCard";
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

const sections = getSections();

const gradeLevels = Object.keys(sections).map((level) => ({
  gradeLevel: level,
  sectionCount: (sections[level] ?? []).length,
}));

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col  bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex flex-1 flex-col  text-[14px] min-h-0 py-2">
        <SectionToolbar schoolYear={SCHOOL_YEAR} />

        <div className="flex flex-wrap gap-4 py-4">
          {gradeLevels.map((grade) => (
            <SectionCard
              key={grade.gradeLevel}
              gradeLevel={grade.gradeLevel}
              count={grade.sectionCount}
              schoolYear={SCHOOL_YEAR}
              onClick={() =>
                navigate(
                  `/admin/academic/schedulesection?level=${encodeURIComponent(
                    grade.gradeLevel,
                  )}`,
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
