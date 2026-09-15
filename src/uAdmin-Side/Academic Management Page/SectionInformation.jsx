import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import ClassInformationToolbar from "../../Components/AdminComponents/Academic Management/Section/ClassInformationToolbar";
import ClassInfoTable from "../../Components/AdminComponents/Academic Management/Section/ClassInfoTable";
import ChangeTeacherModal from "../../Components/AdminModal/AcademicManagementPage/ChangeTeacherModal";
import { getStudents } from "../../utils/data/Admin/students";
import { matchGlobalSearch } from "../../utils/search";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const COLUMNS = [
  { key: "lrn", label: "LRN" },
  { key: "lastName", label: "Last Name" },
  { key: "firstName", label: "First Name" },
  { key: "gender", label: "Gender" },
  { key: "age", label: "Age" },
];

const TEACHERS = [
  "Rosaline Rosamanta",
  "Juan P. Dela Cruz",
  "Maria Santos",
];

const SectionInformation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "Section";
  const section = searchParams.get("section") || "";

  const [teacher, setTeacher] = useState("Ms. Rosaline Romasanta");
  const [isChangeTeacherOpen, setIsChangeTeacherOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const classStudents = getStudents()
    .filter((student) => student.section === section)
    .map((student) => ({
      id: student.id,
      lrn: student.lrn ?? "",
      lastName: student.lastName,
      firstName: student.firstName,
      gender: student.gender ?? "",
      age: student.age ?? "",
    }));

  const filteredStudents = classStudents.filter((student) =>
    matchGlobalSearch(student, searchValue)
  );

  const handleChangeTeacher = () => {
    setIsChangeTeacherOpen(true);
  };

  const handleChangeTeacherSelect = (selectedTeacher) => {
    setTeacher(selectedTeacher);
    setIsChangeTeacherOpen(false);
  };

  const handleGoBack = () => {
    navigate(
      `/admin/academic/sectionclass?level=${encodeURIComponent(level)}`
    );
  };

  const handlePromoteStudent = () => {
    console.log("Promote Student");
  };

  const handleAddStudent = () => {
    console.log("Add Student");
  };

  const handleSearch = () => {
    console.log("Search:", searchValue);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
        <Header 
            navItems={NAV_ITEMS} 
        />

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pt-4">
        <ClassInformationToolbar
          teacher={teacher}
          onChangeTeacher={handleChangeTeacher}
          onGoBack={handleGoBack}
          onPromoteStudent={handlePromoteStudent}
          onAddStudent={handleAddStudent}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
        />

        <ClassInfoTable
          students={filteredStudents}
          columns={COLUMNS}
          onRemove={(student) => console.log("Remove:", student)}
        />
      </div>

        {isChangeTeacherOpen && (
        <ChangeTeacherModal
          teachers={TEACHERS}
          onCancel={() => setIsChangeTeacherOpen(false)}
          onChange={handleChangeTeacherSelect}
        />
      )}
    </div>
  );
};

export default SectionInformation;