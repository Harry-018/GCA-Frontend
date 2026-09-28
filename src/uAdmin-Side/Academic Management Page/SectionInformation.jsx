import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Header from "../../Components/AdminComponents/Academic Management/Header.jsx";
import ClassInformationToolbar from "../../Components/AdminComponents/Academic Management/Section/ClassInformationToolbar.jsx";
import ChangeTeacherModal from "../../Components/AdminModal/AcademicManagementPage/ChangeTeacherModal.jsx";
import DataTable from "../../Components/DataTable.jsx";
import AddStudentToSectionModal from "../../Components/AdminModal/AcademicManagementPage/AddStudentToSectionModal.jsx";
import PromoteStudentModal from "../../Components/AdminModal/AcademicManagementPage/PromoteStudentModal.jsx";
import RemoveStudentModal from "../../Components/AdminModal/AcademicManagementPage/RemoveStudentModal.jsx";

import {
  getSectionDetails,
  getSectionGradeLevels,
  getAdviserTeachers,
  addStudentsToSection,
  promoteStudents,
  removeStudentsFromSection,
  changeSectionTeacher,
} from "../../requests/sectionsRequests.js";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const SectionInformation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const level = searchParams.get("level") || "Section";
  const sectionId = searchParams.get("section_id");

  const [sectionData, setSectionData] = useState(null);
  const [gradeLevels, setGradeLevels] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isChangeTeacherOpen, setIsChangeTeacherOpen] = useState(false);

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const [isPromoteStudentOpen, setIsPromoteStudentOpen] = useState(false);

  const [isRemoveStudentOpen, setIsRemoveStudentOpen] = useState(false);
  const [removeStudentTarget, setRemoveStudentTarget] = useState(null);
  const [removingStudent, setRemovingStudent] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const loadSection = async () => {
    const id = Number(sectionId);

    if (!Number.isInteger(id) || id <= 0) {
      console.error("Invalid section ID:", sectionId);
      return;
    }

    try {
      setLoading(true);

      const result = await getSectionDetails(id);

      setSectionData(result.data);
    } catch (error) {
      console.error("Failed to load section details:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadTeachers = async () => {
    try {
      const result = await getAdviserTeachers();

      setTeachers(result.data || []);
    } catch (error) {
      console.error("Failed to load adviser teachers:", error);
    }
  };

  const loadGradeLevels = async () => {
    try {
      const result = await getSectionGradeLevels();

      setGradeLevels(result.data || []);
    } catch (error) {
      console.error("Failed to load grade levels:", error);
    }
  };

  useEffect(() => {
    loadSection();
    loadGradeLevels();
    loadTeachers();
  }, [sectionId]);

  const section = sectionData?.section;
  const enrollments = sectionData?.enrollments || [];

  const teacher = section ? `${section.first_name} ${section.last_name}` : "";

  /*
   * Search the students already assigned
   * to this section.
   */
  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return enrollments;
    }

    return enrollments.filter((student) => {
      return [
        student.stu_num,
        student.stu_id,
        student.lrn,
        student.enr_status,
        student.date_enrolled,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(term),
      );
    });
  }, [enrollments, search]);

  const handleChangeTeacher = async (teacherId) => {
    try {
      await changeSectionTeacher(Number(sectionId), Number(teacherId));

      setIsChangeTeacherOpen(false);

      await loadSection();
    } catch (error) {
      console.error("Failed to change teacher:", error);
    }
  };

  const handleRemoveStudent = (student) => {
    setRemoveStudentTarget(student);
    setIsRemoveStudentOpen(true);
  };

  const handleConfirmRemoveStudent = async () => {
    if (!removeStudentTarget) return;

    try {
      setRemovingStudent(true);

      await removeStudentsFromSection(Number(sectionId), [
        Number(removeStudentTarget.stu_id),
      ]);

      setSelectedStudentIds((current) =>
        current.filter(
          (id) => Number(id) !== Number(removeStudentTarget.stu_id),
        ),
      );

      setIsRemoveStudentOpen(false);
      setRemoveStudentTarget(null);

      await loadSection();
    } catch (error) {
      console.error("Failed to remove student:", error);
    } finally {
      setRemovingStudent(false);
    }
  };

  const handleGoBack = () => {
    navigate(
      `/admin/academic/sectionclass?level=${encodeURIComponent(
        level,
      )}&sy_grade_level_id=${section?.sy_grade_level_id ?? ""}`,
    );
  };

  const handleAddStudents = async (studentIds) => {
    try {
      await addStudentsToSection(Number(sectionId), studentIds);

      setIsAddStudentOpen(false);

      await loadSection();
    } catch (error) {
      console.error("Failed to add students:", error);
    }
  };

  const handlePromoteStudents = async (targetSyGradeLevelId) => {
    try {
      await promoteStudents(selectedStudentIds, targetSyGradeLevelId);

      setIsPromoteStudentOpen(false);
      setSelectedStudentIds([]);

      await loadSection();
    } catch (error) {
      console.error("Failed to promote students:", error);
    }
  };

  const handlePromoteButton = () => {
    if (selectedStudentIds.length === 0) {
      return;
    }

    setIsPromoteStudentOpen(true);
  };

  const handleSelectedStudentIds = (ids) => {
    setSelectedStudentIds(ids.map(Number));
  };

  const columns = [
    {
      accessorKey: "stu_num",
      header: "STUDENT NO.",
    },
    { accessorKey: "last_name", header: "LAST NAME" },
    { accessorKey: "first_name", header: "FIRST NAME" },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => handleRemoveStudent(row.original)}
          className="rounded-full border  px-3 py-1.5 text-xs font-medium text-egg bg-reject hover:bg-reject/80"
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pt-4">
        <ClassInformationToolbar
          teacher={teacher}
          onChangeTeacher={() => setIsChangeTeacherOpen(true)}
          onGoBack={handleGoBack}
          onPromoteStudent={handlePromoteButton}
          onAddStudent={() => setIsAddStudentOpen(true)}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={() => setSearch(searchValue)}
        />

        <DataTable
          data={filteredStudents}
          columns={columns}
          loading={loading}
          emptyMessage="No students enrolled in this section."
          enableRowSelection
          getRowId={(row) => String(row.stu_id)}
          selectedRowIds={selectedStudentIds}
          onSelectedRowIdsChange={handleSelectedStudentIds}
        />
      </div>

      {/* Change Teacher */}
      {isChangeTeacherOpen && (
        <ChangeTeacherModal
          teachers={teachers}
          currentTeacherId={section?.adviser_teacher_id}
          onCancel={() => setIsChangeTeacherOpen(false)}
          onChange={handleChangeTeacher}
        />
      )}

      {/* Add Student */}
      <AddStudentToSectionModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        sectionId={sectionId}
        onAdd={handleAddStudents}
      />

      <RemoveStudentModal
        isOpen={isRemoveStudentOpen}
        student={removeStudentTarget}
        onCancel={() => {
          if (removingStudent) return;

          setIsRemoveStudentOpen(false);
          setRemoveStudentTarget(null);
        }}
        onConfirm={handleConfirmRemoveStudent}
        loading={removingStudent}
      />

      {/* Promote Student */}
      <PromoteStudentModal
        isOpen={isPromoteStudentOpen}
        onClose={() => setIsPromoteStudentOpen(false)}
        selectedStudentIds={selectedStudentIds}
        gradeLevels={gradeLevels}
        currentSyGradeLevelId={section?.sy_grade_level_id}
        onPromote={handlePromoteStudents}
      />
    </div>
  );
};

export default SectionInformation;
