import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { CalendarDays, School, DoorOpen, Clock3, UserRound, Loader2 } from "lucide-react";
import { getParentStudents, getAnnouncements } from '../utils/data/Parents/dashboard'
import StudentInfo from '../Components/Parents-Side Components/Dashboard/StudentInfo'
import Announcement from '../Components/Parents-Side Components/Dashboard/Announcement'

const INFO_FIELDS = [
  { key: "classSchedule", label: "Class Schedule", icon: CalendarDays },
  { key: "gradeLevel", label: "Grade Level", icon: School },
  { key: "room", label: "Room", icon: DoorOpen },
  { key: "classTime", label: "Class Time", icon: Clock3 },
  { key: "adviser", label: "Adviser", icon: UserRound },
];

const ID_FIELDS = [
  { key: "lrn", label: "Learner Reference Number" },
  { key: "studentId", label: "Student ID Number" },
];

const SCHOOL_YEAR_FIELD = { 
  key: "sy", 
  label: "School Year" 
};

const API_URL = "http://localhost:5000/students";

const announcements = getAnnouncements();
const FALLBACK_STUDENTS = getParentStudents();

const ParentsDashboard = () => {
  const scrollRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       const response = await axios.get(API_URL);
  //       setStudents(Array.isArray(response.data) ? response.data : []);
  //     }
  //     catch (error) {
  //       console.error("Failed to fetch students:", error);
  //       setError("Unable to load dashboard data.");
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchStudents();
  // }, []);

  const displayStudents = students.length > 0 ? students : FALLBACK_STUDENTS;

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const handleScroll = () => {
      const index = Math.round(
        element.scrollLeft / element.clientWidth
      );
      setActiveIndex(Math.min(index, announcements.length - 1));
    };

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-black font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-400">
          Loading Dashboard
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
    <div className="min-h-screen bg-[#ebe9e4] px-5 py-6 font-[Poppins] cursor-default">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

        {/* Students */}
        <div className="flex flex-col gap-4 rounded-3xl">
          {displayStudents.map((s, i) => (
            <StudentInfo
              key={s.studentId || i}
              student={s}
              infoFields={INFO_FIELDS}
              idFields={ID_FIELDS}
              schoolYearField={SCHOOL_YEAR_FIELD}
            />
          ))}
        </div>

        <span className="mx-auto max-w-7xl w-full text-sm font-[PoppinsBold] text-swamp-green sm:text-lg md:text-md uppercase">
          Recent Announcements
        </span>
        <div ref={scrollRef} className="mx-auto max-w-7xl w-full overflow-x-auto lg:overflow-visible no-scrollbar snap-mandatory transition-smooth">
          <div className="flex gap-4 lg:grid lg:grid-cols-2 lg:gap-5">
            {announcements.map((a, i) => (
              <Announcement key={i} {...a} />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 pb-4 lg:hidden">
          {announcements.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === activeIndex ? "w-4 bg-black" : "bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ParentsDashboard;
