import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Download,
  FileDown,
  GraduationCap,
  Loader2,
  Printer,
  X,
} from "lucide-react";
import {
  getParentDashboardStudents,
  getStudentSubjects,
  getStudentSubjectGrades,
  getStudentTeacherRemarks,
} from "../requests/parentRequests";
import StudentCard from "../Components/Parents-Side Components/Grades/StudentCard";
import Remarks from "../Components/Parents-Side Components/Grades/Remarks";
import DevelopmentCard from "../Components/Parents-Side Components/Grades/DevelopmentCard";
import GradeCertificate from "../Components/Parents-Side Components/Grades/GradeCertificate";
import GradeModal from "../Components/Parents-Teacher Modal/GradeModal";
import PortalPageSkeleton from "../Components/PortalPageSkeleton.jsx";

const QUARTERS = ["QUARTER 1", "QUARTER 2", "QUARTER 3"];
const QUARTER_IDS = QUARTERS.map((_, index) => index + 1);

const fetchOrNull = async (request) => {
  try {
    return await request;
  } catch (error) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
};

const Grades = () => {
  const { studentId } = useParams();
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedDevelopment, setSelectedDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const downloadMenuRef = useRef(null);
  const certificateRef = useRef(null);
  const previewCertificateRef = useRef(null);

  const [gradeData, setGradeData] = useState({
    student: {},
    attendance: {},
    developments: {},
    remarks: {},
  });

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        setError("");

        const studentResponse = await getParentDashboardStudents();
        const studentList = Array.isArray(studentResponse?.data)
          ? studentResponse.data
          : [];

        const matchedStudent = studentList.find(
          (item) => String(item.studentId) === String(studentId),
        );

        if (!matchedStudent?.stuId) {
          throw new Error("Student not found.");
        }

        const stuId = matchedStudent.stuId;

        const subjectsResponse = await fetchOrNull(getStudentSubjects(stuId));
        const subjects = Array.isArray(subjectsResponse?.data)
          ? subjectsResponse.data
          : [];

        const [gradeResults, remarkResults] = await Promise.all([
          Promise.all(
            subjects.flatMap((subject) =>
              QUARTER_IDS.map((quarterId) =>
                fetchOrNull(
                  getStudentSubjectGrades(stuId, subject.subject_id, quarterId),
                ),
              ),
            ),
          ),
          Promise.all(
            QUARTER_IDS.map((quarterId) =>
              fetchOrNull(getStudentTeacherRemarks(stuId, quarterId)),
            ),
          ),
        ]);

        const developments = Object.fromEntries(
          QUARTER_IDS.map((quarterId) => [quarterId, []]),
        );

        subjects.forEach((subject, subjectIndex) => {
          QUARTER_IDS.forEach((quarterId, quarterIndex) => {
            const result =
              gradeResults[subjectIndex * QUARTER_IDS.length + quarterIndex];
            const skills = Array.isArray(result?.data?.skills)
              ? result.data.skills
              : [];

            developments[quarterId].push({
              title: subject.subject_name,
              subject_id: subject.subject_id,
              grades: skills.map((skill) => ({
                skill: skill.skill_name,
                description: skill.description,
                grade: skill.grade,
              })),
            });
          });
        });

        const remarks = Object.fromEntries(
          QUARTER_IDS.map((quarterId, index) => [
            quarterId,
            remarkResults[index]?.data?.remarks?.comment || "",
          ]),
        );

        setGradeData({
          student: {
            firstName: matchedStudent.firstName || "",
            lastName: matchedStudent.lastName || "",
            learnerReferenceNumber: matchedStudent.lrn || "",
            studentId: matchedStudent.studentId || studentId,
          },
          attendance: {
            totalDays: "—",
            absences: "—",
          },
          developments,
          remarks,
        });
      } catch (error) {
        console.error("Failed to fetch grades:", error.response?.data || error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load grades data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentId]);

  useEffect(() => {
    if (!isDownloadMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!downloadMenuRef.current?.contains(event.target)) {
        setIsDownloadMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsDownloadMenuOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isDownloadMenuOpen]);

  useEffect(() => {
    if (!isPreviewOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isPreviewOpen]);

  const student = gradeData.student;
  const attendance = gradeData.attendance;
  const remarks = gradeData.remarks[selectedQuarter] || "";
  const developments = QUARTERS.flatMap(
    (_, index) => gradeData.developments[index + 1] || [],
  ).filter(
    (development, index, allDevelopments) =>
      allDevelopments.findIndex(({ title }) => title === development.title) ===
      index,
  );

  const getDevelopmentGrades = (title) => {
    const skills = new Map();

    QUARTERS.forEach((_, index) => {
      const quarter = index + 1;
      const development = (gradeData.developments[quarter] || []).find(
        (item) => item.title === title,
      );

      (development?.grades || []).forEach(({ skill, description, grade }) => {
        const item = skills.get(skill) || {
          skill,
          description: description || "",
          grades: {},
        };
        item.grades[quarter] = grade;
        skills.set(skill, item);
      });
    });

    return [...skills.values()];
  };

  const formatGrade = (grade) =>
    grade == null || String(grade).trim() === "" ? "-" : grade;

  const handlePrint = () => {
    setIsDownloadMenuOpen(false);
    window.print();
  };

  const printDate = new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const studentName = [student.firstName, student.lastName]
    .filter(Boolean)
    .join(" ");

  const handleOpenPdfPreview = () => {
    setIsDownloadMenuOpen(false);
    setIsPreviewOpen(true);
  };

  const handleDownloadPdf = async () => {
    if (!previewCertificateRef.current || isGeneratingPdf) return;

    setIsGeneratingPdf(true);

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(previewCertificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = (canvas.height * pageWidth) / canvas.width;
      let remainingHeight = imageHeight - pageHeight;
      let offset = 0;

      pdf.addImage(image, "PNG", 0, offset, pageWidth, imageHeight);

      while (remainingHeight > 0) {
        offset -= pageHeight;
        pdf.addPage();
        pdf.addImage(image, "PNG", 0, offset, pageWidth, imageHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save(`${studentName || "student"}-grades.pdf`);
      setIsPreviewOpen(false);
    } catch (error) {
      console.error("Failed to generate grades PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleGradesClick = (development) => {
    setSelectedDevelopment(development.title);
  };

  const handleCloseModal = () => {
    setSelectedDevelopment(null);
  };

  if (loading) {
    return <PortalPageSkeleton variant="parent-grades" />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-egg px-4 py-5 font-[Poppins] cursor-default print:min-h-0 print:bg-white print:p-0 sm:px-5 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 print:hidden">
        <StudentCard {...student} {...attendance} />

        {/* Development Cards */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 px-1">
            <h2 className="flex items-center gap-1.5 text-xs font-[PoppinsBold] uppercase text-parent-green sm:gap-2 sm:text-sm">
              <GraduationCap size={16} />
              Grades
            </h2>
            <div ref={downloadMenuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsDownloadMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isDownloadMenuOpen}
                disabled={isGeneratingPdf}
                className="flex shrink-0 items-center gap-2 rounded-full bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white shadow-sm transition hover:bg-parent-accent disabled:opacity-70 sm:text-xs"
              >
                {isGeneratingPdf ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Download size={15} />
                )}
                {isGeneratingPdf ? "Preparing..." : "Download Grades"}
              </button>

              {isDownloadMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-36 rounded-xl border border-black/5 bg-white p-1 shadow-lg"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handlePrint}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-gray-700 transition hover:bg-parent-mint hover:text-parent-green"
                  >
                    <Printer size={14} />
                    Print
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleOpenPdfPreview}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-gray-700 transition hover:bg-parent-mint hover:text-parent-green"
                  >
                    <FileDown size={14} />
                    PDF
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {developments.map((development) => (
              <DevelopmentCard
                key={development.title}
                title={development.title}
                onGradesClick={() => handleGradesClick(development)}
              />
            ))}
          </div>
        </div>

        <Remarks
          remarks={remarks}
          quarters={QUARTERS}
          selectedQuarter={selectedQuarter}
          onQuarterChange={setSelectedQuarter}
        />
      </div>

      <GradeCertificate
        ref={certificateRef}
        student={student}
        studentName={studentName}
        printDate={printDate}
        developments={developments}
        quarters={QUARTERS}
        remarks={gradeData.remarks}
        getDevelopmentGrades={getDevelopmentGrades}
        formatGrade={formatGrade}
        className="mx-auto hidden w-full max-w-204 bg-white px-8 py-6 font-[Arial] text-black print:block print:max-w-none print:px-0 print:py-0"
      />

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-2 print:hidden sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsPreviewOpen(false);
          }}
        >
          <div className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-bone shadow-2xl sm:rounded-2xl">
            <div className="flex items-center justify-between gap-2 border-b border-black/10 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
              <div className="min-w-0">
                <h3 className="truncate text-xs font-[PoppinsBold] text-parent-green sm:text-base">
                  Grade Certificate Preview
                </h3>
                <p className="hidden text-xs text-gray-500 sm:block">
                  Review the grades before downloading.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                aria-label="Close preview"
                className="rounded-full p-1.5 text-gray-500 transition hover:bg-black/5 hover:text-parent-green"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto bg-gray-200/60 p-2 sm:p-5">
              <GradeCertificate
                ref={previewCertificateRef}
                student={student}
                studentName={studentName}
                printDate={printDate}
                developments={developments}
                quarters={QUARTERS}
                remarks={gradeData.remarks}
                getDevelopmentGrades={getDevelopmentGrades}
                formatGrade={formatGrade}
                className="mx-auto w-full max-w-204 bg-white px-3 py-4 font-[Arial] text-black shadow-sm sm:px-8 sm:py-6"
              />
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2 border-t border-black/10 px-3 py-2.5 sm:px-5 sm:py-3">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-full px-3 py-2 text-[11px] font-[PoppinsBold] text-gray-600 transition hover:bg-black/5 sm:px-4 sm:text-xs"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-1.5 rounded-full bg-parent-green px-3 py-2 text-[11px] font-[PoppinsBold] text-white shadow-sm transition hover:bg-parent-accent disabled:opacity-70 sm:gap-2 sm:px-4 sm:text-xs"
              >
                {isGeneratingPdf ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <FileDown size={14} />
                )}
                {isGeneratingPdf ? "Preparing..." : "Download as PDF"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {selectedDevelopment && (
        <GradeModal
          title={selectedDevelopment}
          items={getDevelopmentGrades(selectedDevelopment)}
          quarters={QUARTERS}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Grades;
