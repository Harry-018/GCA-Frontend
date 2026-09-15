import React from "react";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSections } from "../utils/data/Teacher/sections";
import {
  getReportMonths,
  getReportDates,
  getReportYears,
  getReportStudents,
} from "../utils/data/Teacher/report";
import SectionCard from "../Components/Teacher-Side Components/Report/SectionCard";
import ReportFilters from "../Components/Teacher-Side Components/Report/ReportToolbar";
import AttendanceTable from "../Components/Teacher-Side Components/Report/AttendanceTable";

const CLASS_SECTIONS = getSections();
const MONTHS = getReportMonths();
const DATES = getReportDates();
const YEARS = getReportYears();
const STUDENTS = getReportStudents();

const Report = () => {
  const navigate = useNavigate();

  const [sections] = useState(CLASS_SECTIONS);
  const [students] = useState(STUDENTS);
  const [months] = useState(MONTHS);
  const [years] = useState(YEARS);
  const [dates] = useState(DATES);

  const [selectedId, setSelectedId] = useState(CLASS_SECTIONS[0].id);
  const [month, setMonth] = useState("July");
  const [year, setYear] = useState("2026");
  const [studentName, setStudentName] = useState("");

  const [loading] = useState(false);
  const [error] = useState("");

//   // Fetch report data
//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await axios.get(
//           ""
//         );

//         const data = response.data;

//         setSections(data.sections);
//         setStudents(data.students);
//         setMonths(data.months);
//         setYears(data.years);
//         setDates(data.dates);

//         // Select first section
//         if (data.sections.length > 0) {
//           setSelectedId(data.sections[0].id);
//         }

//         // Select first month/year
//         if (data.months.length > 0) {
//           setMonth(data.months[0]);
//         }

//         if (data.years.length > 0) {
//           setYear(data.years[0]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch report:", error);
//         setError("Unable to load attendance report.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, []);

  // Filter students
  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(studentName.toLowerCase()) ||
      student.schoolId
        .toLowerCase()
        .includes(studentName.toLowerCase())
  );

  // Save report
  const handleSaveReport = async () => {
    try {
      await axios.post(
        "",
        {
          sectionId: selectedId,
          month,
          year,
        }
      );

      console.log("Report saved.");
    } catch (error) {
      console.error("Failed to save report:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-black font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-400">
          Loading Reporting
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

  return (
    <div className="min-h-screen cursor-default bg-[#ebe9e4] px-3 py-4 font-[Poppins] sm:px-5 sm:py-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:min-h-0 lg:flex-1">

        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onBack={() => navigate("/teacher/attendance")}
        />

        <ReportFilters
          month={month}
          year={year}
          studentName={studentName}
          months={months}
          years={years}
          onMonthChange={setMonth}
          onYearChange={setYear}
          onStudentNameChange={setStudentName}
          onSaveReport={handleSaveReport}
        />

        <AttendanceTable
          students={filteredStudents}
          dates={dates}
        />

      </div>
    </div>
  );
};

export default Report;