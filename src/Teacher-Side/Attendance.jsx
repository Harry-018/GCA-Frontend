import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAssignedSections } from "../requests/teacherRequests.js";
import {
  getAttendanceStudents,
  saveAttendance,
} from "../requests/teacherRequests.js";

import SectionCard from "../Components/Teacher-Side Components/Dashboard/SectionCard";
import AttendanceToolbar from "../Components/Teacher-Side Components/AttendanceChecker/AttendanceToolbar.jsx";
import DataTable from "../Components/DataTable.jsx";

const PAGE_SIZE = 10;

const getToday = () => {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  );

  return localDate.toISOString().slice(0, 10);
};

const Attendance = () => {
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [schoolYear, setSchoolYear] = useState("");
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

  const attendanceOptions = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
  ];

  // FETCH ASSIGNED SECTIONS
  useEffect(() => {
    const fetchAssignedSections = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAssignedSections();

        if (!response.success) {
          throw new Error(
            response.message || "Failed to retrieve assigned sections.",
          );
        }

        const rows = response.data ?? [];
        const sectionMap = new Map();

        rows.forEach((row) => {
          if (!sectionMap.has(row.section_id)) {
            sectionMap.set(row.section_id, {
              id: row.section_id,
              name: row.section_name,
              level: row.grade_level_name,
            });
          }
        });

        const assignedSections = Array.from(sectionMap.values());

        setSections(assignedSections);
        setSchoolYear(rows[0]?.ay ?? "");
        setSelectedId(assignedSections[0]?.id ?? null);
      } catch (error) {
        console.error("fetchAssignedSections error:", error);
        setError(error.message || "Unable to load assigned sections.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedSections();
  }, []);

  // FETCH ATTENDANCE STUDENTS
  useEffect(() => {
    if (!selectedId || !selectedDate) {
      setStudents([]);
      setAttendance({});
      return;
    }

    let cancelled = false;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");
        setMessage("");

        const response = await getAttendanceStudents(selectedId, selectedDate);

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
  }, [selectedId, selectedDate]);

  // SEARCH + SECTION FILTER
  const filteredStudents = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return students.filter((student) => {
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
  }, [students, searchQuery]);

  // RESET PAGE WHEN FILTERS CHANGE
  useEffect(() => {
    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  }, [selectedId, selectedDate, studentName]);

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

      const attendanceRecords = students.map((student) => ({
        enrollment_id: student.enrollment_id,
        attendance_status: attendance[student.enrollment_id],
      }));

      const response = await saveAttendance(
        selectedId,
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
              className={`rounded-lg cursor-pointer border py-2 text-xs font-[Poppins] outline-none focus:border-swamp-green ${
                currentStatus === "present"
                  ? "border-green-200 bg-green-50 cursor-pointer text-green-700"
                  : "border-red-200 cursor-pointer bg-red-50 text-red-700"
              }`}
            >
              {attendanceOptions.map((option) => (
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
  if (loading && sections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-egg font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-500">Loading attendance...</p>
      </div>
    );
  }

  // ERROR
  if (error && sections.length === 0) {
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
      <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-1 flex-col gap-6">
        {/* SECTIONS */}
        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={handleSectionSelect}
          schoolYear={schoolYear}
        />

        {/* TOOLBAR */}
        <AttendanceToolbar
          studentName={studentName}
          setStudentName={setStudentName}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSearch={handleSearch}
          onSave={handleSave}
          onReport={handleReport}
        />

        {/* STATUS MESSAGES */}
        {saving && (
          <p className="text-xs text-gray-500">Saving attendance...</p>
        )}

        {error && (
          <p role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}

        {message && <p className="text-xs text-green-700">{message}</p>}

        {/* ATTENDANCE TABLE */}
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="flex h-full min-h-0 w-full flex-1 flex-col">
            <DataTable
              data={paginatedStudents}
              columns={columns}
              loading={loading}
              emptyMessage={
                studentName.trim()
                  ? "No students match your search."
                  : "No students found in this section."
              }
              getRowId={(row) => String(row.enrollment_id)}
            />
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

export default Attendance;
