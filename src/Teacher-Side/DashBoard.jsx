import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { getAssignedSections } from "../requests/teacherRequests.js";
import SectionCard from "../Components/Teacher-Side Components/Dashboard/SectionCard";
import DataTable from "../Components/DataTable.jsx";

const PAGE_SIZE = 10;

const DashBoard = () => {
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [schoolYear, setSchoolYear] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  // Fetch the authenticated teacher's assigned sections and students.
  useEffect(() => {
    const fetchAssignedSections = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAssignedSections();

        console.log(response);

        if (!response.success) {
          throw new Error(
            response.message || "Failed to retrieve assigned sections.",
          );
        }

        const rows = response.data ?? [];

        // Group the flat backend response by section.
        const sectionMap = new Map();
        const studentList = [];

        rows.forEach((row) => {
          if (!sectionMap.has(row.section_id)) {
            sectionMap.set(row.section_id, {
              id: row.section_id,
              name: row.section_name,
              level: row.grade_level_name,
            });
          }

          // Add only actual enrolled students.
          if (row.stu_id !== null && row.stu_id !== undefined) {
            studentList.push({
              id: row.stu_id,
              stu_id: row.stu_id,
              sectionId: row.section_id,

              schoolId: row.stu_num,
              lrn: row.lrn,

              first_name: row.first_name,
              middle_name: row.middle_name,
              last_name: row.last_name,

              gender: row.gender,

              birthdate: row.bdate
                ? new Date(row.bdate).toLocaleDateString("en-PH")
                : "—",

              age: row.age,
            });
          }
        });

        const assignedSections = Array.from(sectionMap.values());

        setSections(assignedSections);
        setStudents(studentList);
        setSchoolYear(rows[0]?.ay ?? "");
        setSelectedId(assignedSections[0]?.id ?? null);
      } catch (error) {
        console.error("fetchAssignedSections error:", error);
        setError(error.message || "Unable to load your assigned sections.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedSections();
  }, []);

  // Filter students according to the selected section.
  const filteredStudents = useMemo(
    () =>
      students.filter(
        (student) => String(student.sectionId) === String(selectedId),
      ),
    [students, selectedId],
  );

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
        accessorKey: "Last_name",
        header: "LAST NAME",
        cell: ({ row }) => row.original.last_name || "—",
      },
      {
        accessorKey: "first_name",
        header: "FIRST NAME",
        cell: ({ row }) => row.original.first_name || "—",
      },
      {
        accessorKey: "middle_name",
        header: "MIDDLE NAME",
        cell: ({ row }) => row.original.middle_name || "—",
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

  const pageCount = Math.ceil(filteredStudents.length / pagination.pageSize);

  const paginatedStudents = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;

    return filteredStudents.slice(start, start + pagination.pageSize);
  }, [filteredStudents, pagination.pageIndex, pagination.pageSize]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-egg font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-egg px-4 py-5 font-[Poppins] sm:px-5 sm:py-6">
      <div className="mx-auto flex min-h-0 h-full w-full max-w-7xl flex-1 flex-col gap-6">
        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={handleSectionSelect}
          schoolYear={schoolYear}
        />

        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="h-full min-h-0 w-full flex-col flex flex-1">
            <DataTable
              data={paginatedStudents}
              columns={columns}
              loading={loading}
              emptyMessage="No students found in this section."
              getRowId={(row) => String(row.id)}
            />
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 px-2 py-3">
            <span className="text-xs text-gray-500">
              Page {pageCount === 0 ? 0 : pagination.pageIndex + 1} of{" "}
              {pageCount}
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={pagination.pageIndex === 0}
                onClick={() =>
                  setPagination((previous) => ({
                    ...previous,
                    pageIndex: previous.pageIndex - 1,
                  }))
                }
                className="rounded-full border border-gray-300 px-4 py-2.5 text-xs text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={
                  pageCount === 0 || pagination.pageIndex >= pageCount - 1
                }
                onClick={() =>
                  setPagination((previous) => ({
                    ...previous,
                    pageIndex: previous.pageIndex + 1,
                  }))
                }
                className="rounded-full bg-swamp-green px-4 py-2.5 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
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
