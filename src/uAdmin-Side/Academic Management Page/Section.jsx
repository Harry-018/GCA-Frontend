import React, { useState } from 'react'
import Header from '../../Components/AdminComponents/Academic Management/Header'
import SectionToolbar from '../../Components/AdminComponents/Academic Management/Section/SectionToolbar'
import SectionCard from '../../Components/AdminComponents/Academic Management/Section/SectionCard'
import SubjectModal from '../../Components/AdminModal/AcademicManagementPage/SubjectModal'

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const SCHOOL_YEAR = "2026-2027";

const Section = () => {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === "Subjects") setIsSubjectModalOpen(true);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">

      <Header 
        navItems={NAV_ITEMS} 
      />

      <div className="flex flex-1 flex-col gap-2 min-h-0">
        <SectionToolbar
          schoolYear={SCHOOL_YEAR}
        />

      <div className="flex flex-wrap gap-4 p-4">
        <SectionCard
          level="Pre-School"
          onTabChange={handleTabChange}
        />

        <SectionCard
          level="Pre-Kinder"
          onTabChange={handleTabChange}
        />

        <SectionCard
          level="Kinder"
          onTabChange={handleTabChange}
        />
      </div>
      </div>

      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
      />
    </div>
  )
}

export default Section