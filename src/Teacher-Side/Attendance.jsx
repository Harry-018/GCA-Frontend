import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getSections } from "../utils/data/Teacher/sections";
import {
  getAttendanceOptions,
  getAttendanceStudents,
} from "../utils/data/Teacher/attendance";
import SectionCard from "../Components/Teacher-Side Components/AttendanceChecker/SectionCard";
import AttendanceToolbar from "../Components/Teacher-Side Components/AttendanceChecker/AttendanceToolbar";
import AttendanceChecker from "../Components/Teacher-Side Components/AttendanceChecker/AttendanceChecker";

const Attendance = () => {
  const navigate = useNavigate();
  const [sections] = useState(getSections());
  const [students] = useState(getAttendanceStudents());
  const [attendanceOptions] = useState(getAttendanceOptions());
  const [selectedId, setSelectedId] = useState(getSections()[0].id);
  const [studentName, setStudentName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [attendance, setAttendance] = useState({});
  const [loading] = useState(false);
  const [error] = useState("");

  // FETCH ATTENDANCE DATA
  // useEffect(() => {
  //   const fetchAttendance = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
  //
  //       const response = await axios.get(
  //         ""
  //       );
  //
  //       setSections(response.data.sections);
  //       setStudents(response.data.students);
  //       setAttendanceOptions(response.data.attendanceOptions);
  //
  //       // Select first section automatically
  //       if (response.data.sections.length > 0) {
  //         setSelectedId(response.data.sections[0].id);
  //       }
  //     } catch (error) {
  //       console.error("Failed attendance:", error);
  //       setError("Unable to load attendance data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchAttendance();
  // }, []);

  // FILTER STUDENTS
  const filteredStudents = students.filter(
    (student) =>
      student.sectionId === selectedId &&
      student.fullName
        .toLowerCase()
        .includes(studentName.toLowerCase())
  );

  // ATTENDANCE CHANGE
  const handleAttendanceChange = (id, value) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // SEARCH
  const handleSearch = () => {
    console.log("Searching:", studentName);
  };

  // SAVE
  const handleSave = async () => {
    try {
      await axios.post("", {
        date: selectedDate,
        attendance,
      });

      console.log("Attendance saved.");
    } catch (error) {
      console.error("Failed to save attendance:", error);
    }
  };

  // REPORT
  const handleReport = () => {
    navigate("/teacher/report");
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-black font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-400">
          Loading Attendance
          <span className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </p>
      </div>
    );
  }

  // ERROR
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
    <div className="cursor-default bg-[#ebe9e4] px-5 py-6 font-[Poppins] lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:gap-4 lg:min-h-0 lg:flex-1">

        {/* SECTION */}
        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={setSelectedId}
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

        {/* ATTENDANCE TABLE */}
        {filteredStudents.length > 0 ? (
          <AttendanceChecker
            students={filteredStudents}
            attendance={attendance}
            attendanceOptions={attendanceOptions}
            onAttendanceChange={handleAttendanceChange}
          />
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-sm text-gray-400">
              No students in this section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;