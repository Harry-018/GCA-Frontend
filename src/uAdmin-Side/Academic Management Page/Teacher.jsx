import React, { useEffect, useState } from "react";

import TeacherToolbar from "../../Components/AdminComponents/Academic Management/Teacher/TeacherToolbar";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import AddTeacherModal from "../../Components/AdminModal/AcademicManagementPage/AddTeacherModal";
import EditTeacherModal from "../../Components/AdminModal/AcademicManagementPage/EditTeacherModal";

import DataTable from "../../Components/DataTable.jsx";

import {
  getTeachers,
  getTeacherInfo,
  updateTeacher,
} from "../../requests/teacherRequests.js";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const Teacher = () => {
  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [teachers, setTeachers] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  const [editingTeacher, setEditingTeacher] = useState(null);
  const [email, setEmail] = useState("");

  // ----------------------------------------
  // LOAD TEACHERS
  // ----------------------------------------

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getTeachers({
        status: filter,
        search: searchQuery,
        page: pagination.page,
        limit: pagination.limit,
      });

      setTeachers(result.data || []);

      setPagination((previous) => ({
        ...previous,
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.totalPages || 0,
      }));
    } catch (error) {
      console.error("Error loading teachers:", error);

      setError(error.response?.data?.message || "Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, [filter, searchQuery, pagination.page]);
  // ----------------------------------------
  // SEARCH
  // ----------------------------------------

  const handleSearch = () => {
    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));

    setSearchQuery(search);
  };

  const handlePreviousPage = () => {
    setPagination((previous) => ({
      ...previous,
      page: previous.page - 1,
    }));
  };

  const handleNextPage = () => {
    setPagination((previous) => ({
      ...previous,
      page: previous.page + 1,
    }));
  };

  // ----------------------------------------
  // FILTER
  // ----------------------------------------

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  };

  // ----------------------------------------
  // ADD
  // ----------------------------------------

  const handleAddTeacher = () => {
    setEmail("");
    setIsAddTeacherOpen(true);
  };

  // ----------------------------------------
  // EDIT
  // ----------------------------------------

  const handleEdit = async (teacher) => {
    try {
      setError("");

      const result = await getTeacherInfo(teacher.teacher_id);
      const teacherData = result.data;

      if (!teacherData) return;

      setEditingTeacher({
        ...teacherData,

        address: {
          street: teacherData.house_no ?? "",
          barangay: teacherData.barangay ?? "",
          city: teacherData.city_municipality ?? "",
          zipCode: teacherData.zipcode ?? "",
          province: teacherData.province ?? "",
        },
      });
    } catch (error) {
      console.error("Error getting teacher:", error);

      setError(
        error.response?.data?.message || "Failed to load teacher information.",
      );
    }
  };

  // ----------------------------------------
  // SAVE
  // ----------------------------------------

  const handleSaveTeacher = async (formData) => {
    if (!editingTeacher) return;

    try {
      setError("");

      const data = {
        teacher_status: formData.teacher_status,
      };

      await updateTeacher(editingTeacher.teacher_id, data);

      setEditingTeacher(null);

      await loadTeachers();
    } catch (error) {
      console.error("Error updating teacher:", error);

      setError(error.response?.data?.message || "Failed to update teacher.");
    }
  };

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  const COLUMNS = [
    {
      id: "no",
      header: "NO.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "teacher_num",
      header: "TEACHER ID",
    },
    {
      accessorKey: "last_name",
      header: "LAST NAME",
    },
    {
      accessorKey: "first_name",
      header: "FIRST NAME",
    },
    {
      accessorKey: "gender",
      header: "GENDER",
    },
    {
      accessorKey: "teacher_status",
      header: "STATUS",
      cell: ({ getValue }) => {
        const status = getValue();

        if (status === "on_leave") {
          return "On Leave";
        }

        return status ? status.charAt(0).toUpperCase() + status.slice(1) : "—";
      },
    },
    {
      accessorKey: "email",
      header: "EMAIL",
    },
    {
      id: "actions",
      header: "ACTION",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => handleEdit(row.original)}
          className="rounded-full bg-swamp-green px-4 py-1 text-xs text-white"
          title="Edit teacher"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4]  font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex h-full min-h-0 flex-1 flex-col gap-2 text-[14px]">
        <TeacherToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onSearch={handleSearch}
          status={filter}
          onStatusChange={handleFilterChange}
          onAdd={handleAddTeacher}
        />

        {error && (
          <div className="shrink-0 rounded-md bg-red-50 px-4 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* TABLE */}
        <div className="min-h-0 flex-1">
          <DataTable
            data={teachers}
            columns={COLUMNS}
            loading={loading}
            emptyMessage="No teachers found."
          />
        </div>

        {/* PAGINATION */}
        <div className="flex shrink-0 items-center justify-between px-2 py-3">
          <span className="text-xs text-gray-500">
            Page {pagination.page} of {pagination.totalPages || 0}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.page === 1 || loading}
              onClick={handlePreviousPage}
              className="rounded-full border border-gray-300 px-4 py-1.5 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                loading ||
                pagination.totalPages === 0 ||
                pagination.page >= pagination.totalPages
              }
              onClick={handleNextPage}
              className="rounded-full bg-swamp-green px-4 py-1.5 text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ADD TEACHER */}
      {isAddTeacherOpen && (
        <AddTeacherModal
          email={email}
          onChange={(event) => setEmail(event.target.value)}
          onCancel={() => setIsAddTeacherOpen(false)}
          onSend={() => {
            setEmail("");
            setIsAddTeacherOpen(false);
          }}
        />
      )}

      {/* EDIT TEACHER */}
      {editingTeacher && (
        <EditTeacherModal
          teacher={editingTeacher}
          onClose={() => setEditingTeacher(null)}
          onSave={handleSaveTeacher}
        />
      )}
    </div>
  );
};

export default Teacher;
