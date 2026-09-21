import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import SchoolYearLabel from "../../Components/AdminComponents/Academic Management/Schedule/SchoolYearLabel";
import SectionCard from "../../Components/AdminComponents/Academic Management/Schedule/SectionCard";

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

const DEFAULT_SUBJECTS = {
  "Pre-School": [
    "Physical Development",
    "Emotional Development",
    "Cognitive Development",
    "Spiritual Development",
    "Reading",
    "Numbers",
    "Arts and Crafts",
  ],
  "Pre-Kinder": [
    "Physical Development",
    "Emotional Development",
    "Cognitive Development",
    "Spiritual Development",
    "Reading",
    "Numbers",
    "Arts and Crafts",
    "Story Time",
  ],
  Kinder: [
    "Physical Development",
    "Emotional Development",
    "Cognitive Development",
    "Spiritual Development",
    "Reading",
    "Numbers",
    "Arts and Crafts",
    "Story Time",
    "Music and Movement",
  ],
};

export function getSubjects() {
  return DEFAULT_SUBJECTS;
}

const gradeLevels = Object.keys(DEFAULT_SUBJECTS).map((level) => ({
  gradeLevel: level,
  subjectCount: DEFAULT_SUBJECTS[level]?.length ?? 0,
}));

const GradeLevels = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex flex-1 min-h-0 flex-col">
        <SchoolYearLabel schoolYear={SCHOOL_YEAR} />

        <div className="flex flex-wrap gap-3 py-4 sm:gap-4">
          {gradeLevels.map((grade) => (
            <SectionCard
              key={grade.gradeLevel}
              gradeLevel={grade.gradeLevel}
              count={grade.subjectCount}
              label="Core Subject"
              onClick={() =>
                navigate(
                  `/admin/academic/core-subjects?level=${encodeURIComponent(
                    grade.gradeLevel
                  )}`
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeLevels;