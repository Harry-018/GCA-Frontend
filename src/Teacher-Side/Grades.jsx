import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getSections } from "../utils/data/Teacher/sections";
import { getGradeRoster } from "../utils/data/Teacher/grades";
import SectionCard from "../Components/Teacher-Side Components/AttendanceChecker/SectionCard";
import SearchBar from "../Components/Teacher-Side Components/Grades/SearchBar";
import StudentTable from "../Components/Teacher-Side Components/Grades/StudentTable";
import GradeUploadModal from "../Components/Teacher-Side Components/Grades/GradeUploadModal";
import StudentGradeModal from "../Components/Teacher-Side Components/Grades/StudentGradeModal";

const COLUMNS = [
  { key: "schoolId", label: "School ID" },
  { key: "lrn", label: "LRN" },
  { key: "name", label: "Full Name" },
  { key: "gender", label: "Gender" },
  { key: "actions", label: "Actions" },
];

const Grades = () => {
  const [selectedId, setSelectedId] = useState(getSections()[0].id);
  const [sections] = useState(getSections());
  const [studentName, setStudentName] = useState("");
  const [students] = useState(getGradeRoster());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gradeUploadOpen, setGradeUploadOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  const selectedSection =
    sections.find((section) => String(section.id) === String(selectedId)) ||
    sections[0];

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
  //       // const response = await axios.get("http://localhost:5000/teacher/students");
  //       // setStudents(response.data);
  //     } catch (err) {
  //       console.error("Failed to fetch students:", err);
  //       setError("Unable to load students.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStudents();
  // }, []);

  const handleSearch = () => {};

  const handleViewClick = (student) => {
    setViewStudent(student);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(studentName.toLowerCase()),
  );

  // LOADING
  if (loading) {
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

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 cursor-default bg-egg px-3 py-4 font-[Poppins] sm:px-5 sm:py-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:min-h-0 lg:flex-1">
        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <SearchBar
          studentName={studentName}
          setStudentName={setStudentName}
          onSearch={handleSearch}
          onUpload={() => setGradeUploadOpen(true)}
        />

        <StudentTable
          students={filteredStudents}
          columns={COLUMNS}
          onViewClick={handleViewClick}
        />
      </div>

      {gradeUploadOpen && selectedSection && (
        <GradeUploadModal
          students={students}
          section={selectedSection}
          onClose={() => setGradeUploadOpen(false)}
        />
      )}

      {viewStudent && (
        <StudentGradeModal
          student={viewStudent}
          section={selectedSection}
          onClose={() => setViewStudent(null)}
        />
      )}
    </div>
  );
};

export default Grades;
