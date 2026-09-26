import React, { useEffect, useMemo, useState } from "react";

import Header from "../../Components/AdminComponents/Academic Management/Header";
import StudentInfoModal from "../../Components/AdminModal/AcademicManagementPage/StudentInfoModal";
import StudentToolbar from "../../Components/AdminComponents/Academic Management/Students/StudentToolbar";
import DataTable from "../../Components/DataTable.jsx";
import {
  getOfficialStudents,
  editOfficialStudent,
  getOfficialStudentInfo,
} from "../../requests/officialStudentRequests.js";

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

const Students = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewedStudent, setViewedStudent] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentSaving, setStudentSaving] = useState(false);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [pageCount, setPageCount] = useState(0);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const result = await getOfficialStudents({
        status: activeFilter === "All" ? "all" : activeFilter.toLowerCase(),
        search: searchQuery,
        page: pagination.page,
        limit: pagination.limit,
      });

      setStudents(result.data);

      setPagination((previous) => ({
        ...previous,
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages,
      }));
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [activeFilter, searchQuery, pagination.page, pagination.limit]);

  const handleSearch = () => {
    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));

    setSearchQuery(searchValue);
  };

  const handleView = async (student) => {
    try {
      setStudentLoading(true);

      const result = await getOfficialStudentInfo(student.stu_id);

      setViewedStudent(result);
    } catch (error) {
      console.error("Failed to load student information:", error);
    } finally {
      setStudentLoading(false);
    }
  };

  const handleSaveStudent = async (data) => {
    if (!viewedStudent) return;

    try {
      setStudentSaving(true);

      await editOfficialStudent(viewedStudent.stu_id, data);

      setViewedStudent(null);

      await loadStudents();
    } catch (error) {
      console.error("Failed to update student:", error);
    } finally {
      setStudentSaving(false);
    }
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

  const columns = useMemo(
    () => [
      {
        id: "rowNumber",
        header: "NO.",
        cell: ({ row }) => {
          return (pagination.page - 1) * pagination.limit + row.index + 1;
        },
      },

      {
        accessorKey: "stu_num",
        header: "STU. NO.",
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
        accessorKey: "grade_level_name",
        header: "GRADE LEVEL",
        cell: ({ row }) => row.original.grade_level_name || "---",
      },
      {
        accessorKey: "stu_status",
        header: "STATUS",
      },
      {
        accessorKey: "option_name",
        header: "PAYMENT",
      },
      {
        id: "actions",
        header: "ACTION",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => handleView(row.original)}
            className="rounded-full bg-swamp-green px-4 py-1 text-xs text-white"
          >
            Edit
          </button>
        ),
      },
    ],
    [pagination.pageIndex, pagination.pageSize],
  );

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <StudentToolbar
          filters={FILTERS}
          activeFilter={activeFilter}
          onFilterChange={(value) => {
            setActiveFilter(value);

            setPagination((previous) => ({
              ...previous,
              page: 1,
            }));
          }}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
          schoolYear={SCHOOL_YEAR}
        />

        <DataTable
          data={students}
          columns={columns}
          loading={loading}
          emptyMessage="No students found."
        />
        <div className="flex items-center justify-between px-2 py-3">
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

      {studentLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="rounded-xl bg-white px-5 py-3 text-sm text-gray-600 shadow">
            Loading student...
          </div>
        </div>
      )}

      {viewedStudent && (
        <StudentInfoModal
          student={viewedStudent}
          onClose={() => setViewedStudent(null)}
          onSave={handleSaveStudent}
          saving={studentSaving}
        />
      )}
    </div>
  );
};

export default Students;
