import React, { useState, useEffect } from "react";
import {
  getSchoolYears,
  addSchoolYear,
  editSchoolYear,
} from "../../requests/academicManagementRequests";

import Header from "../../Components/AdminComponents/Academic Management/Header";
import SchoolYearToolbar from "../../Components/AdminComponents/Academic Management/SchoolYear/SchoolYearToolbar";
import AddYearModal from "../../Components/AdminComponents/Academic Management/SchoolYear/AddYearModal";
import EditYearModal from "../../Components/AdminComponents/Academic Management/SchoolYear/EditYearModal";
import DataTable from "../../Components/DataTable.jsx";

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

const SchoolYear = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [schoolYears, setSchoolYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [isAddYearOpen, setIsAddYearOpen] = useState(false);
  const [editingYear, setEditingYear] = useState(null);

  const loadSchoolYears = async () => {
    try {
      setLoading(true);

      const result = await getSchoolYears({
        status: activeFilter,
        search: searchQuery,
        page: pagination.page,
        limit: pagination.limit,
      });

      setSchoolYears(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Failed to load school years:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchoolYears();
  }, [activeFilter, searchQuery, pagination.page, pagination.limit]);

  const handleSearch = () => {
    setSearchQuery(searchValue);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleAddSchoolYear = () => {
    setIsAddYearOpen(true);
  };

  const handleAddYear = async (formData) => {
    try {
      await addSchoolYear({
        start_date: formData.start,
        end_date: formData.end,
        enrollment_status: formData.enrollment_status,
      });

      setIsAddYearOpen(false);

      await loadSchoolYears();
    } catch (error) {
      console.error("Failed to add school year:", error);
      console.error("Response:", error.response?.data);
    }
  };

  const handleEdit = (schoolYear) => {
    setEditingYear(schoolYear);
  };

  const handleSaveEdit = async (updatedYear) => {
    try {
      await editSchoolYear(updatedYear.school_year_id, {
        start_date: updatedYear.start,
        end_date: updatedYear.end,
        enrollment_status: updatedYear.enrollment_status,
        sy_status: updatedYear.sy_status,
      });

      setEditingYear(null);

      await loadSchoolYears();
    } catch (error) {
      console.error("Failed to edit school year:", error);
      console.error("Response:", error.response?.data);
    }
  };

  const columns = [
    {
      header: "NO.",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "School Year",
      cell: ({ row }) => {
        const year = row.original;

        const start = new Date(year.start_date).getFullYear();
        const end = new Date(year.end_date).getFullYear();

        return `${start}-${end}`;
      },
    },
    {
      accessorKey: "start_date",
      header: "Start",
      cell: ({ row }) => {
        const date = row.original.start_date;

        return date
          ? new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })
          : "N/A";
      },
    },
    {
      accessorKey: "end_date",
      header: "End",
      cell: ({ row }) => {
        const date = row.original.end_date;

        return date
          ? new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })
          : "N/A";
      },
    },
    {
      accessorKey: "sy_status",
      header: "STATUS",
      cell: ({ row }) =>
        row.original.sy_status.charAt(0).toUpperCase() +
        row.original.sy_status.slice(1),
    },
    {
      accessorKey: "enrollment_status",
      header: "ENROLLMENT",
      cell: ({ row }) =>
        row.original.enrollment_status.charAt(0).toUpperCase() +
        row.original.enrollment_status.slice(1),
    },
    {
      header: "ACTION",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => handleEdit(row.original)}
          className="rounded-xl border border-gray-400 bg-swamp-green px-3.5 py-1 text-[11px] text-white transition hover:opacity-80 lg:text-xs xl:text-sm"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-2 px-2">
        <SchoolYearToolbar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          onAddSchoolYear={handleAddSchoolYear}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
        />

        {/* TABLE */}
        <div className="flex min-h-0 flex-1">
          <DataTable
            data={schoolYears}
            columns={columns}
            loading={loading}
            emptyMessage="No school years found."
          />
        </div>

        {/* PAGINATION */}
        <div className="flex shrink-0 items-center justify-between px-2 py-3">
          <p className="text-xs text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className="rounded-full border border-gray-300 px-4 py-1.5 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className="rounded-full bg-swamp-green px-4 py-1.5 text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

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
