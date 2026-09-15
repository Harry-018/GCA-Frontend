import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Loader2} from "lucide-react";
import { getSections } from "../utils/data/Teacher/sections";
import { getGradeRoster } from "../utils/data/Teacher/grades";
import SectionCard from "../Components/Teacher-Side Components/AttendanceChecker/SectionCard";
import SearchBar from "../Components/Teacher-Side Components/Grades/SearchBar";
import StudentTable from "../Components/Teacher-Side Components/Grades/StudentTable";

const COLUMNS = [
  { key: "schoolId", label: "School ID" },
  { key: "lrn", label: "LRN" },
  { key: "name", label: "Full Name" },
  { key: "gender", label: "Gender" },
  { key: "actions", label: "Actions" },
];

const Grades = () => {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(getSections()[0].id);
  const [sections] = useState(getSections());
  const [studentName, setStudentName] = useState("");
  const [students] = useState(getGradeRoster());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSearch = () => {
    console.log("Searching:", studentName);
  };

  const handleGradesClick = (student) => {
    navigate(`/teacher/gradesreport/${student.schoolId}`);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(studentName.toLowerCase())
  );

  const hasStudents = !loading && !error && filteredStudents.length > 0;
  const isEmpty = !loading && !error && filteredStudents.length === 0;

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-black font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
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
      <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] font-[Poppins]">
        <p className="text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  {isEmpty && (
    <div className="flex h-40 items-center justify-center">
      <p className="text-sm text-gray-400">No students found.</p>
    </div>
  )}

  return (
    <div className="min-h-screen cursor-default bg-[#ebe9e4] px-5 py-6 font-[Poppins] lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
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
        />

        {hasStudents && (
          <StudentTable
            students={filteredStudents}
            columns={COLUMNS}
            onGradesClick={handleGradesClick}
          />
        )}
      </div>
    </div>
  );
};

export default Grades;
