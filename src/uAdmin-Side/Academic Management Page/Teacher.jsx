import React, { useState, useEffect } from "react";
import TeacherToolbar from "../../Components/AdminComponents/Academic Management/Teacher/TeacherToolbar";
import TeacherTable from "../../Components/AdminComponents/Academic Management/Teacher/TeacherTable";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import AddTeacherModal from "../../Components/AdminModal/AcademicManagementPage/AddTeacherModal";
import EditTeacherModal from "../../Components/AdminModal/AcademicManagementPage/EditTeacherModal";
import {
  getTeachers,
  saveTeachers,
} from "../../utils/data/Admin/teachers";
import { subscribeAcademic } from "../../utils/data/core";
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

const TITLE = "Teachers";

const COLUMNS = [
  { key: "no", label: "NO." },
  { key: "teacherId", label: "TEACHER ID" },
  { key: "lastName", label: "LAST NAME" },
  { key: "firstName", label: "FIRST NAME" },
  { key: "gender", label: "GENDER" },
  { key: "status", label: "STATUS" },
  { key: "email", label: "EMAIL" },
];

const FILTER_OPTIONS = [
  "All",
  "Active",
  "On Live",
  "Resigned",
];

const Teacher = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [teachers, setTeachers] = useState(getTeachers);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    return subscribeAcademic(() => setTeachers(getTeachers()));
  }, []);

  const handleAddTeacher = () => {
    setEmail("");
    setIsAddTeacherOpen(true);
  };

  const handleSearch = () => {
    console.log("Search:", search);
  };

  const handleEdit = (teacher) => {
    setEditingTeacher({
      ...teacher,
      statusOptions: [
        ...FILTER_OPTIONS.filter((option) => option !== "All"),
        teacher.status,
      ].filter(
        (option, index, array) =>
          option && option.trim() && array.indexOf(option) === index
      ),
      middleName: teacher.middleName ?? "",
      address: {
        street: teacher.address?.street ?? "",
        barangay: teacher.address?.barangay ?? "",
        city: teacher.address?.city ?? "",
        zipCode: teacher.address?.zipCode ?? "",
        province: teacher.address?.province ?? "",
      },
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditingTeacher((previous) => ({ ...previous, [name]: value }));
  };

  const handleSaveTeacher = () => {
    if (!editingTeacher) return;
    const updated = teachers.map((teacher) =>
      String(teacher.id) === String(editingTeacher.id)
        ? editingTeacher
        : teacher
    );
    setTeachers(updated);
    saveTeachers(updated);
    setEditingTeacher(null);
  };

  const handleSend = () => {
    console.log("Teacher email:", email);

        setEmail("");
        setIsAddTeacherOpen(false);
    };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesFilter =
      filter === "All" || teacher.status === filter;

    const term = search.trim().toLowerCase();
    const matchesSearch =
      term === "" || matchGlobalSearch(teacher, term);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">

      <Header 
        navItems={NAV_ITEMS} 
      />

    <div className="flex flex-1 flex-col gap-2 min-h-0">
      <TeacherToolbar
        title={TITLE}
        filter={filter}
        filterOptions={FILTER_OPTIONS}
        searchValue={search}
        onFilterChange={(value) => setFilter(value)}
        onAddTeacher={handleAddTeacher}
        onSearchChange={(value) => setSearch(value)}
        onSearch={handleSearch}
      />

      <div className="flex h-full flex-col gap-y-4">
      <TeacherTable
        teachers={filteredTeachers}
        columns={COLUMNS}
        onEdit={handleEdit}
      />
    </div>
    </div>

        {isAddTeacherOpen && (
        <AddTeacherModal
            email={email}
            onChange={(event) => setEmail(event.target.value)}
            onCancel={() => setIsAddTeacherOpen(false)}
            onSend={handleSend}
        />
        )}

        {editingTeacher && (
        <EditTeacherModal
            teacher={editingTeacher}
            onChange={handleEditChange}
            onCancel={() => setEditingTeacher(null)}
            onSave={handleSaveTeacher}
        />
        )}
    </div>
  );
};

export default Teacher;