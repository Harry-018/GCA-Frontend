import { useMemo, useState } from "react";
import { IdCard, Loader2, UserRound } from "lucide-react";

import {
  useAssignedSections,
  useTeacherInfo,
} from "../hooks/queries/usePortalData.js";
import authStore from "../stores/authStore";
import SectionCard from "../Components/Teacher-Side Components/Dashboard/SectionCard";
import DataTable from "../Components/DataTable.jsx";

const PAGE_SIZE = 10;

const DashBoard = () => {
  const {
    data: sectionsResponse,
    isLoading: loading,
    error: sectionsError,
  } = useAssignedSections();
  const { data: teacherResponse, error: teacherFetchError } = useTeacherInfo();

  const [selectedId, setSelectedId] = useState(null);
  const user = authStore((state) => state.user);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const sectionData = useMemo(() => {
    if (sectionsResponse?.success === false) return [];

    return Array.isArray(sectionsResponse?.data) ? sectionsResponse.data : [];
  }, [sectionsResponse]);

  // Group the flat backend response by section.
  const { sections, students, schoolYear } = useMemo(() => {
    const sectionMap = new Map();
    const studentList = [];

    sectionData.forEach((row) => {
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

    return {
      sections: Array.from(sectionMap.values()),
      students: studentList,
      schoolYear: sectionData[0]?.ay ?? "",
    };
  }, [sectionData]);

  const activeSectionId = selectedId ?? sections[0]?.id ?? null;

  const teacherProfile = teacherResponse?.r ?? null;

  const teacherProfileError =
    teacherFetchError?.response?.data?.message ||
    teacherFetchError?.message ||
    "";

  const error =
    sectionsResponse?.success === false
      ? sectionsResponse.message || "Failed to retrieve assigned sections."
      : sectionsError?.response?.data?.message ||
        sectionsError?.message ||
        "";

  // Filter students according to the selected section.
  const filteredStudents = useMemo(
    () =>
      students.filter(
        (student) => String(student.sectionId) === String(activeSectionId),
      ),
    [students, activeSectionId],
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

  const teacherName =
    user?.full_name ||
    [teacherProfile?.first_name, teacherProfile?.last_name]
      .filter(Boolean)
      .join(" ") ||
    "Teacher";

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-egg font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-parent-green" />
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
        <section className="rounded-2xl border border-[#dce9df] bg-linear-to-r from-[#edf5ef] via-[#f5f7f0] to-[#f8f3e9] px-4 py-4 xs:px-5 sm:px-7 sm:py-5">
          <div className="flex flex-col gap-4 xs:gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3 xs:gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-parent-green shadow-sm ring-1 ring-parent-green/5 xs:size-11">
                <UserRound size={21} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-[PoppinsBold] uppercase tracking-[0.12em] text-parent-accent xs:text-xs xs:tracking-[0.16em] sm:text-xs lg:text-sm">
                  Teacher Dashboard
                </p>
                <h1 className="mt-1 wrap-break-word    text-sm leading-snug font-[PoppinsBold] text-parent-green xs:text-base sm:text-lg lg:text-2xl">
                  Welcome, {teacherName}!
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start rounded-xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm sm:min-w-48 sm:self-auto">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf5ef] text-parent-green">
                <IdCard size={18} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-[PoppinsBold] uppercase tracking-[0.12em] text-gray-500 xs:text-xs xs:tracking-[0.15em]">
                  Teacher ID
                </p>
                <p className="mt-0.5 wrap-break-word text-xs font-[PoppinsBold] text-parent-green xs:text-sm">
                  {user?.teacher_num ||
                    (teacherProfile
                      ? teacherProfile.teacher_num || "—"
                      : teacherProfileError
                        ? "Unavailable"
                        : "Loading...")}
                </p>
                {teacherProfileError && (
                  <p role="alert" className="mt-1 wrap-break-word text-xs text-red-600 xs:text-xs">
                    {teacherProfileError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <SectionCard
          sections={sections}
          selectedId={activeSectionId}
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
                className="rounded-full border border-gray-300 px-4 py-2.5 text-xs text-gray-600 transition-colors duration-200 hover:border-parent-accent/40 hover:bg-parent-pale/40 hover:text-parent-green disabled:cursor-not-allowed disabled:opacity-40"
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
                className="rounded-full bg-parent-green px-4 py-2.5 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
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
