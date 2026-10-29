import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { getSections } from "../utils/data/Teacher/sections";
import { getTeacherDashboardStudents } from "../utils/data/Teacher/dashboard";
import SectionCard from "../Components/Teacher-Side Components/Dashboard/SectionCard";
import DataTable from "../Components/DataTable.jsx";

const PAGE_SIZE = 10;

const DashBoard = () => {
  const [sections] = useState(() => getSections() ?? []);
  const [students] = useState(() => getTeacherDashboardStudents() ?? []);
  const [schoolYear, setSchoolYear] = useState("");

  const [selectedId, setSelectedId] = useState(
    () => getSections()?.[0]?.id ?? null,
  );

  const [loading] = useState(false);
  const [error] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  // Filter students by the selected section.
  const filteredStudents = useMemo(
    () =>
      students.filter(
        (student) => String(student.sectionId) === String(selectedId),
      ),
    [students, selectedId],
  );

  // Reset pagination whenever the selected section changes.
  const handleSectionSelect = (sectionId) => {
    setSelectedId(sectionId);
    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "schoolId",
        header: "SCHOOL ID",
        cell: ({ row }) => row.original.schoolId || "—",
      },
      {
        accessorKey: "lrn",
        header: "LRN",
        cell: ({ row }) => row.original.lrn || "—",
      },
      {
        accessorKey: "fullName",
        header: "FULL NAME",
        cell: ({ row }) => row.original.fullName || "—",
      },
      {
        accessorKey: "gender",
        header: "GENDER",
        cell: ({ row }) => row.original.gender || "—",
      },
      {
        accessorKey: "birthdate",
        header: "BIRTHDATE",
        cell: ({ row }) => row.original.birthdate || "—",
      },
      {
        accessorKey: "age",
        header: "AGE",
        cell: ({ row }) => row.original.age ?? "—",
      },
    ],
    [],
  );

  // DataTable uses manual pagination, so provide only the current page.
  const pageCount = Math.ceil(filteredStudents.length / pagination.pageSize);

  const paginatedStudents = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;

    return filteredStudents.slice(start, start + pagination.pageSize);
  }, [filteredStudents, pagination.pageIndex, pagination.pageSize]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#ebe9e4] font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] font-[Poppins]">
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-egg px-4 py-5 font-[Poppins] sm:px-5 sm:py-6">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-6">
        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={handleSectionSelect}
          schoolYear={schoolYear}
        />

        {/* Table takes all remaining height */}
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="h-full min-h-0 w-full flex-1">
            <DataTable
              data={paginatedStudents}
              columns={columns}
              loading={loading}
              emptyMessage="No students found in this section."
              getRowId={(row) => String(row.id)}
            />
          </div>
          {/* Pagination stays outside the table */}
          <div className="flex shrink-0 items-center justify-between gap-3 px-2 py-3">
            <span className="text-xs text-gray-500">
              Page {pageCount === 0 ? 0 : pagination.pageIndex + 1} of{" "}
              {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={pagination.pageIndex === 0 || loading}
                onClick={() =>
                  setPagination((previous) => ({
                    ...previous,
                    pageIndex: previous.pageIndex - 1,
                  }))
                }
                className="rounded-full border border-gray-300 px-4 py-1.5 text-xs text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={
                  loading ||
                  pageCount === 0 ||
                  pagination.pageIndex >= pageCount - 1
                }
                onClick={() =>
                  setPagination((previous) => ({
                    ...previous,
                    pageIndex: previous.pageIndex + 1,
                  }))
                }
                className="rounded-full bg-swamp-green px-4 py-1.5 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
