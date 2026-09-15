import React, { useState, useEffect, useMemo } from "react";
import {
  getEnrolled,
  getStudents,
  saveStudents,
} from "../../utils/data/Admin/students";
import { subscribeAcademic, writeAcademicStore } from "../../utils/data/core";
import { matchGlobalSearch } from "../../utils/search";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import StudentTable from "../../Components/AdminComponents/Academic Management/Students/StudentTable";
import StudentInfoModal from "../../Components/AdminModal/AcademicManagementPage/StudentInfoModal";
import StudentToolbar from "../../Components/AdminComponents/Academic Management/Students/StudentToolbar";

const COLUMNS = [
  { key: "no", label: "NO." },
  { key: "lastName", label: "LAST NAME" },
  { key: "firstName", label: "FIRST NAME" },
  { key: "gradeLevel", label: "GRADE LEVEL" },
  { key: "section", label: "SECTION" },
  { key: "status", label: "STATUS" },
];

const STATUS_OPTIONS = ["Active", "Dropout", "Transferred"];

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const FILTERS = ["All", "Active", "Dropout", "Transferred"];
const SCHOOL_YEAR = "2026-2027";


const normalizeStudent = (student) => ({
  ...student,
  lrn: student.lrn ?? "",
  middleName: student.middleName ?? "",
  age: student.age ?? "",
  gender: student.gender ?? "",
  studentNo: student.studentNo ?? student.id,
  statusOptions: STATUS_OPTIONS.includes(student.status)
    ? STATUS_OPTIONS
    : [...STATUS_OPTIONS, student.status].filter(
        (status) => status && status.trim()
      ),
  dateOfBirth: student.dateOfBirth ?? "",
  placeOfBirth: student.placeOfBirth ?? "",
  religion: student.religion ?? "",
  nationality: student.nationality ?? "",
  disability: student.disability ?? "",
  address: {
    street: student.address?.street ?? "",
    barangay: student.address?.barangay ?? "",
    city: student.address?.city ?? "",
    zipCode: student.address?.zipCode ?? "",
    province: student.address?.province ?? "",
  },
});

const Students = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [viewedStudent, setViewedStudent] = useState(null);

  const [enrolled, setEnrolled] = useState(getEnrolled);

  useEffect(() => {
    return subscribeAcademic(() => setEnrolled(getEnrolled()));
  }, []);

  const allStudents = useMemo(
    () => [...getStudents(), ...enrolled],
    [enrolled]
  );

  const handleSearch = () => {
    console.log("Search:", searchValue);
  };

  const handleView = (applicant) => {
    setViewedStudent(normalizeStudent(applicant));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setViewedStudent((previous) => ({ ...previous, [name]: value }));
  };

  const handleSave = () => {
    if (!viewedStudent) return;

    const students = getStudents();
    const enrolled = getEnrolled();

    if (students.some((s) => String(s.id) === String(viewedStudent.id))) {
      saveStudents(
        students.map((s) =>
          String(s.id) === String(viewedStudent.id) ? viewedStudent : s
        )
      );
    } else if (
      enrolled.some((s) => String(s.id) === String(viewedStudent.id))
    ) {
      writeAcademicStore({
        enrolledStudents: enrolled.map((s) =>
          String(s.id) === String(viewedStudent.id) ? viewedStudent : s
        ),
      });
    }

    setViewedStudent(null);
  };

  const filteredStudents = allStudents.filter((student) => {
    const matchesFilter =
      activeFilter === "All" || student.status === activeFilter;

    const term = searchValue.trim().toLowerCase();
    const matchesSearch =
      term === "" || matchGlobalSearch(student, term);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header 
        navItems={NAV_ITEMS} 
      />

      <div className="flex flex-1 flex-col gap-2 min-h-0">
        <StudentToolbar
          filters={FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
          schoolYear={SCHOOL_YEAR}
        />

        <StudentTable
          applicants={filteredStudents}
          columns={COLUMNS}
          onView={handleView}
        />
      </div>

      {viewedStudent && (
        <StudentInfoModal
          applicant={viewedStudent}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setViewedStudent(null)}
        />
      )}
    </div>
  );
};

export default Students;