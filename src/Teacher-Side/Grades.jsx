import { useState, useMemo, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import {
  getAssignedSections,
  getStudentGradesOfSection,
  getTeacherGradingQuarters,
  getTeacherGradingSubjects,
  uploadGradesToStudents,
  uploadTeacherRemarks,
} from "../requests/teacherRequests.js";
import SectionCard from "../Components/Teacher-Side Components/AttendanceChecker/SectionCard";
import SearchBar from "../Components/Teacher-Side Components/Grades/SearchBar";
import GradeUploadModal from "../Components/Teacher-Side Components/Grades/GradeUploadModal";
import StudentGradeModal from "../Components/Teacher-Side Components/Grades/StudentGradeModal";
import DataTable from "../Components/DataTable.jsx";

const PAGE_SIZE = 10;

const extractList = (response, key) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.[key]?.data)) return response[key].data;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

const normalizeQuarters = (response) =>
  extractList(response, "quarters").map((quarter, index) => ({
    quarter_id: quarter.quarter_id ?? quarter.id ?? index + 1,
    quarter_name:
      quarter.quarter_name ??
      quarter.name ??
      `Quarter ${quarter.quarter_id ?? index + 1}`,
  }));

const normalizeSubjects = (response) =>
  extractList(response, "subjects").map((subject, index) => ({
    subject_id: subject.subject_id ?? subject.id ?? index + 1,
    subject_name: subject.subject_name ?? subject.name ?? "—",
  }));

const normalizeRosterStudents = (rows = [], templateData = null) => {
  const gradesByEnrollment = new Map(
    (templateData?.students ?? []).map((student) => [
      String(student.enrollment_id),
      Array.isArray(student.grades) ? student.grades : [],
    ]),
  );

  const seen = new Set();

  return rows.reduce((students, row) => {
    const enrollmentId = row.enrollment_id;

    if (
      enrollmentId == null ||
      seen.has(String(enrollmentId)) ||
      (row.enr_status && row.enr_status !== "enrolled")
    ) {
      return students;
    }

    seen.add(String(enrollmentId));

    students.push({
      id: enrollmentId,
      enrollment_id: enrollmentId,
      stu_id: row.stu_id,
      schoolId: row.stu_num ?? "",
      lrn: row.lrn ?? "",
      name:
        [row.first_name, row.middle_name, row.last_name]
          .filter(Boolean)
          .join(" ") ||
        row.name ||
        "—",
      gender: row.gender ?? "",
      grades: gradesByEnrollment.get(String(enrollmentId)) ?? [],
    });

    return students;
  }, []);
};

const Grades = () => {
  const [sections, setSections] = useState([]);
  const [rosterRows, setRosterRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [quarters, setQuarters] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gradeUploadOpen, setGradeUploadOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const selectedSection = sections.find(
    (section) => String(section.id) === String(selectedId),
  );

  const students = useMemo(() => {
    if (!selectedId) return [];

    return normalizeRosterStudents(
      rosterRows.filter((row) => String(row.section_id) === String(selectedId)),
      templateData,
    );
  }, [rosterRows, selectedId, templateData]);

  // FETCH ASSIGNED SECTIONS
  useEffect(() => {
    let cancelled = false;

    const fetchSections = async () => {
      try {
        setError("");

        const response = await getAssignedSections();

        if (!response?.success) {
          throw new Error(
            response?.message || "Failed to retrieve assigned sections.",
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
              ay: row.ay,
            });
          }
        });

        const assignedSections = Array.from(sectionMap.values());

        if (!cancelled) {
          setRosterRows(rows);
          setSections(assignedSections);
          setSelectedId(
            (current) => current ?? assignedSections[0]?.id ?? null,
          );
        }
      } catch (err) {
        console.error("fetchAssignedSections error:", err);

        if (!cancelled) {
          setError(err.message || "Unable to load assigned sections.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSections();

    return () => {
      cancelled = true;
    };
  }, []);

  // FETCH AVAILABLE QUARTERS
  useEffect(() => {
    let cancelled = false;

    const fetchQuarters = async () => {
      try {
        const response = await getTeacherGradingQuarters();

        if (response?.success === false) {
          throw new Error(response?.message || "Failed to load quarters.");
        }

        const list = normalizeQuarters(response);

        if (!cancelled) {
          setQuarters(list);
          setSelectedQuarter(
            (current) => current ?? list[0]?.quarter_id ?? null,
          );
        }
      } catch (err) {
        console.error("getTeacherGradingQuarters error:", err);

        if (!cancelled) {
          setError(err.message || "Unable to load grading quarters.");
        }
      }
    };

    fetchQuarters();

    return () => {
      cancelled = true;
    };
  }, []);

  // FETCH SUBJECTS AVAILABLE FOR THE SELECTED QUARTER
  useEffect(() => {
    if (!selectedQuarter) return;

    let cancelled = false;

    const fetchSubjects = async () => {
      try {
        const response = await getTeacherGradingSubjects(selectedQuarter);

        if (response?.success === false) {
          throw new Error(response?.message || "Failed to load subjects.");
        }

        const list = normalizeSubjects(response);

        if (!cancelled) {
          setSubjects(list);
          setSelectedSubjectId((current) =>
            list.some(
              (subject) => String(subject.subject_id) === String(current),
            )
              ? current
              : (list[0]?.subject_id ?? null),
          );
        }
      } catch (err) {
        console.error("getTeacherGradingSubjects error:", err);

        if (!cancelled) {
          setSubjects([]);
          setError(err.message || "Unable to load grading subjects.");
        }
      }
    };

    fetchSubjects();

    return () => {
      cancelled = true;
    };
  }, [selectedQuarter]);

  // FETCH SKILLS AND EXISTING GRADES FOR THE UPLOAD TEMPLATE
  useEffect(() => {
    if (!selectedId || !selectedSubjectId || !selectedQuarter) return;

    let cancelled = false;

    const fetchTemplate = async () => {
      try {
        const response = await getStudentGradesOfSection({
          section_id: selectedId,
          subject_id: selectedSubjectId,
          quarter_id: selectedQuarter,
        });

        if (response?.success === false) {
          throw new Error(
            response?.message || "Failed to retrieve student grades.",
          );
        }

        if (!cancelled) {
          setTemplateData(response.data ?? null);
        }
      } catch (err) {
        console.error("getStudentGradesOfSection error:", err);

        if (!cancelled) {
          setTemplateData(null);
        }
      }
    };

    fetchTemplate();

    return () => {
      cancelled = true;
    };
  }, [selectedId, selectedSubjectId, selectedQuarter, refreshKey]);

  const filteredStudents = useMemo(() => {
    const search = appliedSearch.trim().toLowerCase();

    if (!search) return students;

    return students.filter((student) =>
      [student.schoolId, student.lrn, student.name].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search),
      ),
    );
  }, [students, appliedSearch]);

  const viewRecords = useMemo(() => {
    if (!viewStudent || !templateData) return [];

    const skillNames = new Map(
      (templateData.skills ?? []).map((skill) => [
        String(skill.skill_id),
        skill.skill_name,
      ]),
    );

    return (viewStudent.grades ?? []).map((grade) => ({
      sectionId: selectedId,
      studentId: viewStudent.stu_id ?? viewStudent.enrollment_id,
      subject: templateData.subject?.subject_name ?? "",
      skill:
        skillNames.get(String(grade.skill_id)) ?? `Skill ${grade.skill_id}`,
      skill_id: grade.skill_id,
      quarter: templateData.quarter?.quarter_id ?? selectedQuarter,
      grade: grade.grade,
      date_recorded: grade.date_recorded,
    }));
  }, [viewStudent, templateData, selectedId, selectedQuarter]);

  const handleQuarterChange = useCallback((quarterId) => {
    setSelectedQuarter(quarterId);
    setSelectedSubjectId(null);
    setTemplateData(null);
    setViewStudent(null);
  }, []);

  const handleSubjectChange = useCallback((subjectId) => {
    setSelectedSubjectId(subjectId);
    setTemplateData(null);
    setViewStudent(null);
  }, []);

  const handleViewClick = useCallback((student) => {
    setViewStudent(student);
  }, []);

  const handleUpload = useCallback(
    async ({ subject_id, quarter_id, grades }) =>
      uploadGradesToStudents({
        section_id: selectedId,
        subject_id,
        quarter_id,
        grades,
      }),
    [selectedId],
  );

  const handleRemarksUpload = useCallback(
    async ({ quarter_id, remarks }) =>
      uploadTeacherRemarks({
        section_id: selectedId,
        quarter_id,
        remarks,
      }),
    [selectedId],
  );

  const handleUploadSuccess = useCallback(() => {
    setRefreshKey((previous) => previous + 1);
  }, []);

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
        accessorKey: "name",
        header: "FULL NAME",
        cell: ({ row }) => row.original.name || "—",
      },
      {
        accessorKey: "gender",
        header: "GENDER",
        cell: ({ row }) => row.original.gender || "—",
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => handleViewClick(row.original)}
            className="cursor-pointer rounded-full bg-parent-green px-4 py-1.5 text-2xs font-[PoppinsBold] text-white transition hover:bg-parent-accent sm:px-5 sm:text-xs"
          >
            View
          </button>
        ),
      },
    ],
    [handleViewClick],
  );

  // PAGINATION
  const pageCount = Math.ceil(filteredStudents.length / pagination.pageSize);

  const paginatedStudents = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;

    return filteredStudents.slice(start, start + pagination.pageSize);
  }, [filteredStudents, pagination.pageIndex, pagination.pageSize]);

  if (loading && sections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-egg font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-parent-green" />
        <p className="text-sm text-gray-400">
          Loading Grades
          <span className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </p>
      </div>
    );
  }

  if (error && sections.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 cursor-default bg-egg px-3 py-4 font-[Poppins] sm:px-5 sm:py-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:min-h-0 lg:flex-1">
        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            setStudentName("");
            setAppliedSearch("");
            setViewStudent(null);
            setPagination((previous) => ({
              ...previous,
              pageIndex: 0,
            }));
          }}
          schoolyear={selectedSection.ay}
        />

        <SearchBar
          studentName={studentName}
          setStudentName={setStudentName}
          onSearch={() => {
            setAppliedSearch(studentName);
            setPagination((previous) => ({
              ...previous,
              pageIndex: 0,
            }));
          }}
          onUpload={() => setGradeUploadOpen(true)}
        />

        {error && (
          <p role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}

        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="flex h-full min-h-0 w-full flex-1 flex-col">
            <DataTable
              data={selectedId ? paginatedStudents : []}
              columns={columns}
              loading={loading}
              emptyMessage={
                appliedSearch.trim()
                  ? "No students match your search."
                  : "No students found in this section."
              }
              getRowId={(row) => String(row.id)}
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

      {gradeUploadOpen && selectedSection && (
        <GradeUploadModal
          section={selectedSection}
          quarters={quarters}
          subjects={subjects}
          selectedQuarter={selectedQuarter}
          onQuarterChange={handleQuarterChange}
          selectedSubjectId={selectedSubjectId}
          onSubjectChange={handleSubjectChange}
          templateData={templateData}
          onUpload={handleUpload}
          onRemarksUpload={handleRemarksUpload}
          onSuccess={handleUploadSuccess}
          onClose={() => setGradeUploadOpen(false)}
        />
      )}

      {viewStudent && selectedSection && (
        <StudentGradeModal
          student={viewStudent}
          section={selectedSection}
          records={viewRecords}
          quarters={quarters}
          onClose={() => setViewStudent(null)}
        />
      )}
    </div>
  );
};

export default Grades;
