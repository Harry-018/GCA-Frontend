import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import ClassInformationToolbar from "../../Components/AdminComponents/Academic Management/Section/SectionClass/ClassInformationToolbar";
import ClassInfoTable from "../../Components/AdminComponents/Academic Management/Section/SectionClass/ClassInfoTable";
import AddStudentModal from "../../Components/AdminModal/AcademicManagementPage/AddStudentModal";
import PromoteStudentModal from "../../Components/AdminModal/AcademicManagementPage/PromoteStudentModal";
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

const GRADE_LEVELS = [
  "Pre-School",
  "Pre-Kinder",
  "Kinder",
];

const PROMOTION_OPTIONS = [
  { value: "Promoted", label: "Promoted" },
  { value: "Retained", label: "Retained" },
];

const SectionInformation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "Section";
  const section = searchParams.get("section") || "";

  const [teacher, setTeacher] = useState("Ms. Rosaline Romasanta");
  const [isChangeTeacherOpen, setIsChangeTeacherOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isPromoteStudentOpen, setIsPromoteStudentOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [classStudents, setClassStudents] = useState(() =>
    getStudents()
      .filter((student) => student.section === section)
      .map((student) => ({
        id: student.id,
        lrn: student.lrn ?? "",
        lastName: student.lastName,
        firstName: student.firstName,
        gender: student.gender ?? "",
        age: student.age ?? "",
        gradeLevel: student.gradeLevel ?? "",
      }))
  );

  const availableStudents = getStudents()
    .filter((student) => student.section !== section)
    .map((student) => ({
      id: student.id,
      studentNo: student.lrn ?? student.id,
      lrn: student.lrn ?? "",
      lastName: student.lastName,
      firstName: student.firstName,
      gender: student.gender ?? "",
      age: student.age ?? "",
      gradeLevel: student.gradeLevel ?? "",
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
    setIsPromoteStudentOpen(true);
  };

  const handleAddStudent = () => {
    setIsAddStudentOpen(true);
  };

  const handleAddStudents = (selectedStudents) => {
    const added = selectedStudents.map((student) => ({
      id: student.id,
      lrn: student.lrn ?? student.studentNo,
      lastName: student.lastName,
      firstName: student.firstName,
      gender: student.gender ?? "",
      age: student.age ?? "",
      gradeLevel: student.gradeLevel ?? "",
    }));

    setClassStudents((current) => [...current, ...added]);
    setIsAddStudentOpen(false);
  };

  const handlePromoteStudents = (updatedStudents) => {
    console.log("Promoted students:", updatedStudents);
    setIsPromoteStudentOpen(false);
  };

  const handleRemove = (student) => {
    setClassStudents((current) =>
      current.filter((item) => item.id !== student.id)
    );
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
          onRemove={handleRemove}
        />
      </div>

        {isChangeTeacherOpen && (
        <ChangeTeacherModal
          teachers={TEACHERS}
          onCancel={() => setIsChangeTeacherOpen(false)}
          onChange={handleChangeTeacherSelect}
        />
      )}

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAdd={handleAddStudents}
        students={availableStudents}
      />

      <PromoteStudentModal
        isOpen={isPromoteStudentOpen}
        onClose={() => setIsPromoteStudentOpen(false)}
        onSave={handlePromoteStudents}
        students={classStudents.map((student) => ({
          studentNo: student.lrn || student.id,
          lastName: student.lastName,
          firstName: student.firstName,
          gradeLevel: student.gradeLevel,
        }))}
        gradeLevels={GRADE_LEVELS}
        promotionOptions={PROMOTION_OPTIONS}
      />
    </div>
  );
};

export default SectionInformation;