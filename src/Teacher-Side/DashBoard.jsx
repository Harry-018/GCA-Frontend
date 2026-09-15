import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getSections } from "../utils/data/Teacher/sections";
import { getTeacherDashboardStudents } from "../utils/data/Teacher/dashboard";
import SectionCard from "../Components/Teacher-Side Components/Dashboard/SectionCard";
import StudentTable from "../Components/Teacher-Side Components/Dashboard/StudentTable";

const DashBoard = () => {
  const [sections] = useState(getSections());
  const [students] = useState(getTeacherDashboardStudents());
  const [selectedId, setSelectedId] = useState(getSections()[0].id);

  const [loading] = useState(false);
  const [error] = useState("");

  // Get sections and students from backend
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");

  //       const response = await axios.get(
  //         ""
  //       );

  //       setSections(response.data.sections);
  //       setStudents(response.data.students);

  //       // Select the first section automatically
  //       if (response.data.sections.length > 0) {
  //         setSelectedId(response.data.sections[0].id);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch dashboard data:", error);
  //       setError("Unable to load dashboard data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  // Filter students based on selected section
  const filteredStudents = students.filter(
    (student) => student.sectionId === selectedId
  );

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
    <div className="min-h-screen cursor-default bg-[#ebe9e4] px-5 py-6 font-[Poppins] lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:min-h-0 lg:flex-1">

        <SectionCard
          sections={sections}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <StudentTable
          students={filteredStudents}
        />

      </div>
    </div>
  );
};

export default DashBoard;