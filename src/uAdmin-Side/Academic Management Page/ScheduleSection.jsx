import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import ScheduleSetupCard from "../../Components/AdminComponents/Academic Management/Schedule/ScheduleSetupCard";
import { getScheduleSections } from "../../requests/schedulesRequests.js";
const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];
const ScheduleSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const syGradeLevelId = searchParams.get("sy_grade_level_id");
  const level = searchParams.get("level") || "";
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!syGradeLevelId) {
      setSections([]);
      setLoading(false);
      return;
    }
    const loadSections = async () => {
      try {
        setLoading(true);
        const data = await getScheduleSections(syGradeLevelId);
        setSections(data);
      } catch (error) {
        console.error("Failed to load schedule sections:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSections();
  }, [syGradeLevelId]);
  const schoolYear = "2026 - 2027";
  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        <div className="flex items-center justify-between gap-2 py-2">
          <div className="flex items-center gap-2">
            <h1 className="font-[PoppinsBold] text-md text-swamp-green">
              {level} :
            </h1>
            <span className="whitespace-nowrap font-[Poppins] text-sm text-gray-600">
              S.Y {schoolYear}
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border bg-white px-4 py-1 font-[Poppins] text-sm text-gray-500 transition hover:text-swamp-green"
          >
            Go Back
          </button>
        </div>
        {loading ? (
          <div className="py-10 text-center text-sm text-gray-500">
            Loading sections...
          </div>
        ) : sections.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            No active sections found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sections.map((item) => (
              <ScheduleSetupCard
                key={item.section_id}
                sectionName={item.section_name}
                onClick={() =>
                  navigate(
                    `/admin/academic/setupschedule?sy_grade_level_id=${syGradeLevelId}&level=${encodeURIComponent(level)}&section_id=${item.section_id}&section=${encodeURIComponent(item.section_name)}`,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ScheduleSection;
