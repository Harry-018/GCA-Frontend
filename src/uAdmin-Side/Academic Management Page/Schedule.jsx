import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import SectionToolbar from "../../Components/AdminComponents/Academic Management/Section/SectionToolbar";
import SectionCard from "../../Components/AdminComponents/Academic Management/Schedule/SectionCard";
import { getScheduleGradeLevels } from "../../requests/schedulesRequests.js";
const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];
const Schedule = () => {
  const navigate = useNavigate();
  const [gradeLevels, setGradeLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadGradeLevels = async () => {
      try {
        setLoading(true);
        const data = await getScheduleGradeLevels();
        setGradeLevels(data);
      } catch (error) {
        console.error("Failed to load schedule grade levels:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGradeLevels();
  }, []);
  const schoolYear =
    gradeLevels.length > 0
      ? `${new Date(gradeLevels[0].start_date).getFullYear()} - ${new Date(gradeLevels[0].end_date).getFullYear()}`
      : "—";
  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col bg-[#ebe9e4] font-[Poppins]">
      {" "}
      <Header navItems={NAV_ITEMS} />{" "}
      <div className="flex min-h-0 flex-1 flex-col py-2 text-[14px]">
        {" "}
        <SectionToolbar schoolYear={schoolYear} />{" "}
        {loading ? (
          <div className="py-10 text-center text-sm text-gray-500">
            {" "}
            Loading grade levels...{" "}
          </div>
        ) : gradeLevels.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            {" "}
            No grade levels available.{" "}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 py-4">
            {" "}
            {gradeLevels.map((grade) => (
              <SectionCard
                key={grade.sy_grade_level_id}
                gradeLevel={grade.grade_level_name}
                count={Number(grade.section_count)}
                schoolYear={schoolYear}
                onClick={() =>
                  navigate(
                    `/admin/academic/schedulesection?sy_grade_level_id=${grade.sy_grade_level_id}&level=${encodeURIComponent(grade.grade_level_name)}`,
                  )
                }
              />
            ))}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default Schedule;
