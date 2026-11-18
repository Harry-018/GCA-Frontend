import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GraduationCap, Loader2, Printer } from "lucide-react";
import {
  getParentDashboardStudents,
  getStudentSubjects,
  getStudentSubjectGrades,
  getStudentTeacherRemarks,
} from "../requests/parentRequests";
import schoolLogo from "../assets/logowbg.png";
import StudentCard from "../Components/Parents-Side Components/Grades/StudentCard";
import Remarks from "../Components/Parents-Side Components/Grades/Remarks";
import DevelopmentCard from "../Components/Parents-Side Components/Grades/DevelopmentCard";
import GradeModal from "../Components/Parents-Teacher Modal/GradeModal";

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

  const handleGradesClick = (development) => {
    setSelectedDevelopment(development.title);
  };

  const handleCloseModal = () => {
    setSelectedDevelopment(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-egg font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-parent-green" />
        <p className="text-sm text-gray-500">
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
            <button
              type="button"
              onClick={handlePrint}
              className="flex shrink-0 items-center gap-2 rounded-full bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white shadow-sm transition hover:bg-parent-accent sm:text-xs"
            >
              <Printer size={15} />
              Print Grades
            </button>
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

      <article className="mx-auto hidden w-full max-w-204 bg-white px-8 py-6 font-[Arial] text-black print:block print:max-w-none print:px-0 print:py-0">
        <header className="relative flex min-h-20 items-center justify-center border-b border-gray-400 pb-4">
          <img
            src={schoolLogo}
            alt="Grace Christian Academy logo"
            className="absolute left-0 size-16 object-contain"
          />
          <div className="text-center">
            <p className="text-xs font-semibold">Grace Christian Academy</p>
            <h1 className="mt-1 text-lg font-bold uppercase">
              Grace Christian Academy
            </h1>
            <p className="text-xs">Student Academic Record</p>
          </div>
        </header>

        <h2 className="mt-6 text-center text-base font-bold uppercase tracking-wide">
          Unofficial Certificate of Grades
        </h2>

        <p className="mt-4 text-right text-xs underline">{printDate}</p>
        <p className="text-right text-xs">Date</p>

        <p className="mt-7 text-sm font-bold">To Whom It May Concern:</p>
        <p className="mt-4 text-justify text-sm leading-6">
          This is to certify that <strong>{studentName || "-"}</strong>, with
          Student ID <strong>{student.studentId || "-"}</strong> and Learner
          Reference Number{" "}
          <strong>{student.learnerReferenceNumber || "-"}</strong>, has the
          following recorded skill grades:
        </p>

        <table className="mt-5 w-full table-fixed border-collapse text-xs">
          <thead>
            <tr>
              <th className="w-[52%] border border-black px-2 py-2 text-left">
                Skill
              </th>
              {QUARTERS.map((quarter) => (
                <th
                  key={quarter}
                  className="border border-black px-2 py-2 text-center"
                >
                  {quarter}
                </th>
              ))}
            </tr>
          </thead>
          {developments.map((development) => (
            <tbody key={development.title}>
              <tr>
                <th
                  colSpan={QUARTERS.length + 1}
                  className="border border-black bg-gray-100 px-2 py-2 text-left"
                >
                  {development.title}
                </th>
              </tr>
              {getDevelopmentGrades(development.title).map((item) => (
                <tr key={item.skill}>
                  <td className="border border-black px-2 py-1.5">
                    {item.skill}
                  </td>
                  {QUARTERS.map((_, index) => (
                    <td
                      key={index}
                      className="border border-black px-2 py-1.5 text-center"
                    >
                      {formatGrade(item.grades[index + 1])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>

        <h3 className="mt-6 text-sm font-bold uppercase">Teacher Remarks</h3>
        <table className="mt-2 w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="w-1/4 border border-black px-2 py-2 text-left">
                Quarter
              </th>
              <th className="border border-black px-2 py-2 text-left">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {QUARTERS.map((quarter, index) => {
              const remark = gradeData.remarks[index + 1];

              return (
                <tr key={quarter}>
                  <td className="border border-black px-2 py-2">{quarter}</td>
                  <td className="border border-black px-2 py-2">
                    {remark?.trim() || "No remarks"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>

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
