import React, { useState } from "react";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import SchoolYearToolbar from "../../Components/AdminComponents/Academic Management/SchoolYear/SchoolyearToolbar";
import SchoolyearTable from "../../Components/AdminComponents/Academic Management/SchoolYear/SchoolyearTable";
import AddYearModal from "../../Components/AdminComponents/Academic Management/SchoolYear/AddYearModal";
import EditYearModal from "../../Components/AdminComponents/Academic Management/SchoolYear/EditYearModal";
// schoolyeartable

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const INITIAL_SCHOOL_YEARS = [
  {
    id: 1,
    schoolYear: "2024-2025",
    start: "Jul 27, 2024",
    end: "Mar 27, 2025",
    status: "Archived",
    enrollment: "Closed",
    created: "Jul 27, 2024",
  },
  {
    id: 2,
    schoolYear: "2025-2026",
    start: "Jul 27, 2025",
    end: "Mar 27, 2026",
    status: "Active",
    enrollment: "Open",
    created: "Jul 27, 2025",
  },
  {
    id: 3,
    schoolYear: "2026-2027",
    start: "Jul 27, 2026",
    end: "Mar 27, 2027",
    status: "Draft",
    enrollment: "Pending",
    created: "Jul 27, 2026",
  },
];

const SchoolYear = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [schoolYears, setSchoolYears] = useState(INITIAL_SCHOOL_YEARS);

  const [isAddYearOpen, setIsAddYearOpen] = useState(false);
  const [editingYear, setEditingYear] = useState(null);

  const handleSearch = () => {
    console.log("Search:", searchValue);
  };

  const filteredSchoolYears = schoolYears.filter((schoolYear) => {
    const matchesFilter =
      activeFilter === "All" || schoolYear.status === activeFilter;

    const term = searchValue.trim().toLowerCase();
    const matchesSearch =
      term === "" ||
      `${schoolYear.schoolYear} ${schoolYear.status} ${schoolYear.enrollment}`
        .toLowerCase()
        .includes(term);

    return matchesFilter && matchesSearch;
  });

  const handleAddSchoolYear = () => {
    setIsAddYearOpen(true);
  };

  const handleAddYear = (formData) => {
    const { schoolYear, start, end, status } = formData;

    const newYear = {
      id: Date.now(),
      schoolYear,
      start,
      end,
      status,
      enrollment: status === "Draft" ? "Pending" : "Open",
      created: new Date().toDateString(),
    };

    setSchoolYears((prev) => [...prev, newYear]);
    setIsAddYearOpen(false);
  };

  const handleEdit = (schoolYear) => {
    setEditingYear(schoolYear);
  };

  const handleSaveEdit = (updatedYear) => {
    setSchoolYears((prev) =>
      prev.map((item) => (item.id === updatedYear.id ? updatedYear : item)),
    );
    setEditingYear(null);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <SchoolYearToolbar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onAddSchoolYear={handleAddSchoolYear}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
      />

      <SchoolyearTable schoolYears={filteredSchoolYears} onEdit={handleEdit} />

      <AddYearModal
        isOpen={isAddYearOpen}
        onClose={() => setIsAddYearOpen(false)}
        onAdd={handleAddYear}
      />

      <EditYearModal
        isOpen={editingYear !== null}
        schoolYearData={editingYear}
        onClose={() => setEditingYear(null)}
        onEdit={handleSaveEdit}
      />
    </div>
  );
};

export default SchoolYear;
