import React, { useEffect, useState } from "react";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import SectionToolbar from "../../Components/AdminComponents/Academic Management/Section/SectionToolbar";
import SectionCard from "../../Components/AdminComponents/Academic Management/Section/SectionCard";
import { getSectionGradeLevels } from "../../requests/sectionsRequests";

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

const Section = () => {
  const [gradeLevels, setGradeLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGradeLevels = async () => {
      try {
        const result = await getSectionGradeLevels();

        setGradeLevels(result.data || []);
      } catch (error) {
        console.error("Failed to load section grade levels:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGradeLevels();
  }, []);

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-2 text-[14px]">
        <SectionToolbar schoolYear={SCHOOL_YEAR} />

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="p-4 text-xs text-gray-500">Loading grade levels...</p>
          ) : gradeLevels.length === 0 ? (
            <p className="p-4 text-xs text-gray-500">No grade levels found.</p>
          ) : (
            gradeLevels.map((item) => (
              <SectionCard
                key={item.sy_grade_level_id}
                level={item.grade_level_name}
                syGradeLevelId={item.sy_grade_level_id}
                sectionCount={Number(item.section_count)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
