import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getAssignedSections,
  getMonthlyAttendanceReport,
} from "../requests/teacherRequests.js";

import SectionCard from "../Components/Teacher-Side Components/Dashboard/SectionCard";
import ReportFilters from "../Components/Teacher-Side Components/Report/ReportToolbar";
import DataTable from "../Components/DataTable.jsx";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Parse a SQL date string without accidentally shifting its calendar date
// because of timezone conversion.
const parseLocalDate = (value) => {
  if (!value) return null;

  const dateString =
    value instanceof Date
      ? [
          value.getFullYear(),
          String(value.getMonth() + 1).padStart(2, "0"),
          String(value.getDate()).padStart(2, "0"),
        ].join("-")
      : String(value).slice(0, 10);

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
};

const Report = () => {
  const navigate = useNavigate();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [sections, setSections] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const [studentName, setStudentName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [dates, setDates] = useState([]);
  const [students, setStudents] = useState([]);

  const [loadingSections, setLoadingSections] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState("");

  // Fetch the teacher's assigned sections.
  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoadingSections(true);
        setError("");

        const response = await getAssignedSections();

        const rows = Array.isArray(response)
          ? response
          : (response?.r ?? response?.data?.r ?? response?.data ?? []);

        // Group the flat student rows by section.
        const sectionMap = new Map();

        rows.forEach((row) => {
          const sectionId = row.section_id;

          if (!sectionMap.has(sectionId)) {
            sectionMap.set(sectionId, {
              id: sectionId,
              section_id: sectionId,
              name: row.section_name,
              level: row.grade_level_name,
              ay: row.ay,
              school_year_id: row.school_year_id,
              start_date: row.start_date,
              end_date: row.end_date,
            });
          }
        });

        const assignedSections = Array.from(sectionMap.values());

        setSections(assignedSections);

        if (assignedSections.length > 0) {
          setSelectedId(assignedSections[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch assigned sections:", error);
        setError("Unable to load your assigned sections.");
      } finally {
        setLoadingSections(false);
      }
    };

    fetchSections();
  }, []);

  // Get the currently selected section.
  const selectedSection = sections.find(
    (section) => String(section.id) === String(selectedId),
  );

  // Generate available months using the selected section's school-year dates.
  const availableMonths = useMemo(() => {
    if (!selectedSection?.start_date || !selectedSection?.end_date) {
      return [];
    }

    const start = parseLocalDate(selectedSection.start_date);
    const end = parseLocalDate(selectedSection.end_date);

    if (!start || !end || start > end) {
      return [];
    }

    const months = [];

    const current = new Date(start.getFullYear(), start.getMonth(), 1);

    const last = new Date(end.getFullYear(), end.getMonth(), 1);

    while (current <= last) {
      months.push({
        label: MONTH_NAMES[current.getMonth()],
        month: current.getMonth() + 1,
        year: current.getFullYear(),
      });

      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }, [selectedSection]);

  // Generate available years from the generated months.
  const availableYears = useMemo(() => {
    return [...new Set(availableMonths.map((item) => String(item.year)))];
  }, [availableMonths]);

  // Select a valid month/year whenever the selected section changes.
  useEffect(() => {
    if (availableMonths.length === 0) {
      setMonth("");
      setYear("");
      setDates([]);
      setStudents([]);
      return;
    }

    const today = new Date();

    const matchingPeriod = availableMonths.find(
      (item) =>
        item.month === today.getMonth() + 1 &&
        item.year === today.getFullYear(),
    );

    const selectedPeriod = matchingPeriod || availableMonths[0];

    setMonth(selectedPeriod.label);
    setYear(String(selectedPeriod.year));
  }, [availableMonths]);

  // Get the exact month/year combination selected by the teacher.
  const selectedPeriod = useMemo(() => {
    return availableMonths.find(
      (item) => item.label === month && String(item.year) === String(year),
    );
  }, [availableMonths, month, year]);

  // Change the month while keeping the currently selected year.
  const handleMonthChange = (selectedMonth) => {
    const matchingPeriod = availableMonths.find(
      (item) =>
        item.label === selectedMonth && String(item.year) === String(year),
    );

    if (matchingPeriod) {
      setMonth(matchingPeriod.label);
    }
  };

  // Change the year and preserve the month when possible.
  const handleYearChange = (selectedYear) => {
    const matchingPeriod = availableMonths.find(
      (item) =>
        String(item.year) === String(selectedYear) && item.label === month,
    );

    if (matchingPeriod) {
      setYear(String(matchingPeriod.year));
      return;
    }

    // If the selected month is unavailable in the new year,
    // select the first available month in that year.
    const firstPeriod = availableMonths.find(
      (item) => String(item.year) === String(selectedYear),
    );

    if (firstPeriod) {
      setMonth(firstPeriod.label);
      setYear(String(firstPeriod.year));
    }
  };

  // Fetch the monthly report whenever the section, month, or year changes.
  useEffect(() => {
    if (!selectedId || !selectedPeriod) {
      setDates([]);
      setStudents([]);
      setLoadingReport(false);
      return;
    }

    let cancelled = false;

    const fetchReport = async () => {
      try {
        setLoadingReport(true);
        setError("");

        const response = await getMonthlyAttendanceReport(
          selectedId,
          selectedPeriod.month,
          selectedPeriod.year,
        );

        if (cancelled) return;

        const report = response?.data;

        setDates(report?.dates ?? []);
        setStudents(report?.students ?? []);
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to fetch attendance report:", error);

        setDates([]);
        setStudents([]);

        setError(
          error.response?.data?.message ??
            "Unable to load the attendance report.",
        );
      } finally {
        if (!cancelled) {
          setLoadingReport(false);
        }
      }
    };

    fetchReport();

    return () => {
      cancelled = true;
    };
  }, [selectedId, selectedPeriod]);

  const handleSearch = () => {
    setSearchQuery(studentName.trim());
  };

  // Download the attendance report as CSV.
  const handleDownloadCSV = () => {
    if (students.length === 0) {
      setError("There are no attendance records to download.");
      return;
    }

    const headers = [
      "School ID",
      "LRN",
      "Student Name",
      ...dates,
      "Present",
      "Absent",
    ];

    const escapeCSV = (value) => {
      const safeValue = String(value ?? "");

      return `"${safeValue.replace(/"/g, '""')}"`;
    };

    const rows = students.map((student) => {
      const fullName = [
        student.first_name,
        student.middle_name,
        student.last_name,
      ]
        .filter(Boolean)
        .join(" ");

      return [
        student.stu_num,
        student.lrn,
        fullName,
        ...dates.map((date) => {
          const status = student.attendance?.[date];

          if (status === "present") return "Present";
          if (status === "absent") return "Absent";

          return "";
        }),
        student.present_count,
        student.absent_count,
      ];
    });

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    // UTF-8 BOM helps spreadsheet applications display text correctly.
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Attendance_${
      selectedSection?.name ?? "Report"
    }_${month}_${year}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // Filter students locally by name, school ID, or LRN.
  const filteredStudents = useMemo(() => {
    const search = searchQuery.toLowerCase();

    if (!search) return students;

    return students.filter((student) => {
      const fullName = [
        student.first_name,
        student.middle_name,
        student.last_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const schoolId = String(student.stu_num ?? "").toLowerCase();
      const lrn = String(student.lrn ?? "").toLowerCase();

      return (
        fullName.includes(search) ||
        schoolId.includes(search) ||
        lrn.includes(search)
      );
    });
  }, [students, searchQuery]);

  // Build the attendance table columns.
  const columns = useMemo(() => {
    const studentColumns = [
      {
        header: "School ID",
        accessorKey: "stu_num",
        size: 110,
      },
      {
        header: "LRN",
        accessorKey: "lrn",
        size: 110,
      },
      {
        header: "Student Name",
        accessorKey: "full_name",
        size: 200,
        cell: (info) => {
          const student = info.row.original;

          return [student.first_name, student.middle_name, student.last_name]
            .filter(Boolean)
            .join(" ");
        },
      },
    ];

    const summaryColumns = [
      {
        header: "Present",
        accessorKey: "present_count",
        size: 90,
        cell: ({ row }) => {
          const student = row.original;
          const presentCount = student.present_count ?? 0;

          return (
            <span className="font-[PoppinsBold] text-swamp-green">
              {presentCount}
            </span>
          );
        },
      },
      {
        header: "Absent",
        accessorKey: "absent_count",
        size: 90,
        cell: ({ row }) => {
          const student = row.original;
          const absentCount = student.absent_count ?? 0;

          return (
            <span className="font-[PoppinsBold] text-reject">
              {absentCount}
            </span>
          );
        },
      },
    ];

    const dateColumns = [...dates].reverse().map((date) => ({
      header: date.slice(8, 10),
      accessorKey: `attendance.${date}`,
      size: 55,
      cell: (info) => {
        const student = info.row.original;
        const status = student.attendance?.[date];

        if (status === "present") {
          return (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-swamp-green text-xs font-[PoppinsBold] text-white">
              P
            </span>
          );
        }

        if (status === "absent") {
          return (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-reject text-xs font-[PoppinsBold] text-white">
              A
            </span>
          );
        }

        return <span className="text-sm text-gray-400">-</span>;
      },
    }));

    // Keep student information and attendance summaries fixed on the left.
    // Daily attendance columns remain horizontally scrollable.
    return [...studentColumns, ...summaryColumns, ...dateColumns];
  }, [dates]);

  if (loadingSections) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#ebe9e4] font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-500">Loading assigned sections...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen cursor-default bg-[#ebe9e4] px-3 py-4 font-[Poppins] sm:px-5 sm:py-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:min-h-0 lg:flex-1">
        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={(sectionId) => {
            setSelectedId(sectionId);
            setDates([]);
            setStudents([]);
            setStudentName("");
            setSearchQuery("");
          }}
          onBack={() => navigate("/teacher/attendance")}
          schoolYear={selectedSection?.ay || ""}
        />

        <ReportFilters
          month={month}
          year={year}
          months={availableMonths
            .filter((item) => String(item.year) === String(year))
            .map((item) => item.label)}
          years={availableYears}
          studentName={studentName}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          onStudentNameChange={setStudentName}
          onSearch={handleSearch}
          onSaveReport={handleDownloadCSV}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        {loadingReport ? (
          <div className="flex items-center justify-center gap-3 py-10">
            <Loader2 size={24} className="animate-spin text-swamp-green" />
            <p className="text-sm text-gray-500">
              Loading attendance report...
            </p>
          </div>
        ) : (
          <DataTable
            data={filteredStudents}
            columns={columns}
            loading={loadingReport}
            emptyMessage={
              error
                ? "Unable to load attendance report."
                : "No attendance records found for this month."
            }
            getRowId={(student) => student.enrollment_id}
            stickyColumns={[
              "stu_num",
              "lrn",
              "full_name",
              "present_count",
              "absent_count",
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Report;
