import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAttendanceStudents,
  saveAttendance,
} from "../requests/teacherRequests.js";
import { useAssignedSections } from "../hooks/queries/usePortalData.js";

import SectionCard from "../Components/Teacher-Side Components/Dashboard/SectionCard";
import AttendanceToolbar from "../Components/Teacher-Side Components/AttendanceChecker/AttendanceToolbar.jsx";
import DataTable from "../Components/DataTable.jsx";
import PortalPageSkeleton from "../Components/PortalPageSkeleton.jsx";

const PAGE_SIZE = 10;

const ATTENDANCE_OPTIONS = [
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
];

const getToday = () => {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  );

  return localDate.toISOString().slice(0, 10);
};

const Attendance = () => {
  const navigate = useNavigate();

  const {
    data: sectionsResponse,
    isLoading: sectionsLoading,
    error: sectionsFetchError,
  } = useAssignedSections();

  const [selectedId, setSelectedId] = useState(null);

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [studentName, setStudentName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(getToday());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const sectionData = useMemo(() => {
    if (sectionsResponse?.success === false) return [];

    return Array.isArray(sectionsResponse?.data) ? sectionsResponse.data : [];
  }, [sectionsResponse]);

  const { sections, schoolYear } = useMemo(() => {
    const sectionMap = new Map();

    sectionData.forEach((row) => {
      if (!sectionMap.has(row.section_id)) {
        sectionMap.set(row.section_id, {
          id: row.section_id,
          name: row.section_name,
          level: row.grade_level_name,
        });
      }
    });

    return {
      sections: Array.from(sectionMap.values()),
      schoolYear: sectionData[0]?.ay ?? "",
    };
  }, [sectionData]);

  const activeSectionId = selectedId ?? sections[0]?.id ?? null;

  const sectionError =
    sectionsResponse?.success === false
      ? sectionsResponse.message || "Failed to retrieve assigned sections."
      : sectionsFetchError?.response?.data?.message ||
        sectionsFetchError?.message ||
        "";

  // FETCH ATTENDANCE STUDENTS
  useEffect(() => {
    if (!activeSectionId || !selectedDate) return undefined;

    let cancelled = false;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");
        setMessage("");

        const response = await getAttendanceStudents(
          activeSectionId,
          selectedDate,
        );

        if (!response.success) {
          throw new Error(
            response.message || "Failed to retrieve attendance students.",
          );
        }

        const studentList = (response.data ?? []).map((row) => ({
          id: row.enrollment_id,
          enrollment_id: row.enrollment_id,
          stu_id: row.stu_id,
          schoolId: row.stu_num,
          lrn: row.lrn,
          first_name: row.first_name,
          middle_name: row.middle_name,
          last_name: row.last_name,
          gender: row.gender,
          attendance_status: row.attendance_status || "present",
        }));

        if (!cancelled) {
          setStudents(studentList);

          const savedAttendance = {};

          studentList.forEach((student) => {
            savedAttendance[student.enrollment_id] = student.attendance_status;
          });

          setAttendance(savedAttendance);
        }
      } catch (error) {
        console.error("fetchAttendanceStudents error:", error);

        if (!cancelled) {
          setStudents([]);
          setAttendance({});
          setError(error.message || "Unable to load attendance students.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchStudents();

    return () => {
      cancelled = true;
    };
  }, [activeSectionId, selectedDate]);

  // SEARCH + SECTION FILTER
  const activeStudents = useMemo(
    () => (activeSectionId && selectedDate ? students : []),
    [activeSectionId, selectedDate, students],
  );

  const filteredStudents = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return activeStudents.filter((student) => {
      const matchesSearch =
        !search ||
        String(student.schoolId ?? "")
          .toLowerCase()
          .includes(search) ||
        String(student.lrn ?? "")
          .toLowerCase()
          .includes(search) ||
        String(student.last_name ?? "")
          .toLowerCase()
          .includes(search) ||
        String(student.first_name ?? "")
          .toLowerCase()
          .includes(search) ||
        String(student.middle_name ?? "")
          .toLowerCase()
          .includes(search);

      return matchesSearch;
    });
  }, [activeStudents, searchQuery]);

  const handleDateChange = (value) => {
    setSelectedDate(value);

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  };

  // SECTION SELECT
  const handleSectionSelect = (sectionId) => {
    setSelectedId(sectionId);
    setStudentName("");
    setSearchQuery("");

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  };

  const handleSearch = () => {
    setSearchQuery(studentName);

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  };

  // ATTENDANCE CHANGE
  const handleAttendanceChange = (enrollmentId, value) => {
    setAttendance((previous) => ({
      ...previous,
      [enrollmentId]: value,
    }));

    setMessage("");
  };

  // SAVE ATTENDANCE
  const handleSave = async () => {
    try {
      setSaving(true);

      const attendanceRecords = activeStudents.map((student) => ({
        enrollment_id: student.enrollment_id,
        attendance_status: attendance[student.enrollment_id],
      }));

      const response = await saveAttendance(
        activeSectionId,
        selectedDate,
        attendanceRecords,
      );

      console.log("Save attendance response:", response);
    } catch (error) {
      console.error("Save attendance error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleReport = () => {
    navigate("/teacher/report");
  };

  // TABLE COLUMNS
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
        accessorKey: "attendance_status",
        header: "ATTENDANCE",
        cell: ({ row }) => {
          const student = row.original;
          const currentStatus = attendance[student.enrollment_id] || "present";

          return (
            <select
              value={currentStatus}
              onChange={(event) =>
                handleAttendanceChange(
                  student.enrollment_id,
                  event.target.value,
                )
              }
              className={`rounded-lg cursor-pointer border py-2 text-xs font-[Poppins] outline-none focus:border-parent-green ${
                currentStatus === "present"
                  ? "border-green-200 bg-green-50 cursor-pointer text-green-700"
                  : "border-red-200 cursor-pointer bg-red-50 text-red-700"
              }`}
            >
              {ATTENDANCE_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={
                    option.value === "present"
                      ? "bg-green-50 text-green-700 cursor-pointer"
                      : "bg-red-50 text-red-700 cursor-pointer"
                  }
                >
                  {option.label}
                </option>
              ))}
            </select>
          );
        },
      },
    ],
    [attendance],
  );

  // PAGINATION
  const pageCount = Math.ceil(filteredStudents.length / pagination.pageSize);

  const paginatedStudents = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;

    return filteredStudents.slice(start, start + pagination.pageSize);
  }, [filteredStudents, pagination.pageIndex, pagination.pageSize]);

  // LOADING
  if ((loading || sectionsLoading) && sections.length === 0) {
    return <PortalPageSkeleton variant="teacher-attendance" />;
  }

  // ERROR
  if ((error || sectionError) && sections.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p role="alert" className="text-sm text-red-500">
          {error || sectionError}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-egg px-4 py-5 font-[Poppins] sm:px-5 sm:py-6">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        {/* SECTIONS */}
        <SectionCard
          sections={sections}
          selectedId={activeSectionId}
          onSelect={handleSectionSelect}
          schoolYear={schoolYear}
        />

        {/* TOOLBAR */}
        <AttendanceToolbar
          studentName={studentName}
          setStudentName={setStudentName}
          selectedDate={selectedDate}
          setSelectedDate={handleDateChange}
          onSearch={handleSearch}
          onSave={handleSave}
          onReport={handleReport}
        />

        {/* STATUS MESSAGES */}
        {saving && (
          <p className="text-xs text-gray-500">Saving attendance...</p>
        )}

        {(error || sectionError) && (
          <p role="alert" className="text-xs text-red-500">
            {error || sectionError}
          </p>
        )}

        {message && <p className="text-xs text-green-700">{message}</p>}

        {/* ATTENDANCE TABLE */}
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="flex h-full min-h-0 w-full flex-1 flex-col">
            {loading || sectionsLoading ? (
              <PortalPageSkeleton variant="table" />
            ) : (
              <DataTable
                data={paginatedStudents}
                columns={columns}
                emptyMessage={
                  studentName.trim()
                    ? "No students match your search."
                    : "No students found in this section."
                }
                getRowId={(row) => String(row.enrollment_id)}
              />
            )}
          </div>

          {/* PAGINATION */}
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

export default Attendance;
