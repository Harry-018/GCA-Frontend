import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { GraduationCap, Loader2 } from 'lucide-react'
import {
  getParentQuarters,
  getParentGradeData,
} from '../utils/data/Parents/grades'
import StudentCard from '../Components/Parents-Side Components/Grades/StudentCard'
import Remarks from '../Components/Parents-Side Components/Grades/Remarks'
import DevelopmentCard from '../Components/Parents-Side Components/Grades/DevelopmentCard'
import GradeModal from '../Components/Parents-Teacher Modal/GradeModal'

const QUARTERS = getParentQuarters();
const API_URL = "http://localhost:5000/parent/grades";

const Grades = () => {
  const { studentId } = useParams();
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedDevelopment, setSelectedDevelopment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // LOCAL FALLBACK DATA (used when backend is not available)
  const FALLBACK_DATA = getParentGradeData(studentId);

  // ACTIVE STATE for grade data
  const [gradeData, setGradeData] = useState(FALLBACK_DATA);

  // useEffect(() => {
  //   const fetchGrades = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
  //       const response = await axios.get(`${API_URL}/${studentId}`);
  //       setGradeData(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch grades:", error);
  //       setError("Unable to load grades data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchGrades();
  // }, [studentId]);

  const student = gradeData.student;
  const attendance = gradeData.attendance;
  const gradesData = gradeData.developments[selectedQuarter] || [];
  const remarks = gradeData.remarks[selectedQuarter] || "";

  const handleGradesClick = (development) => {
    setSelectedDevelopment(development.title);
  };

  const handleCloseModal = () => {
    setSelectedDevelopment(null);
  };

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

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#ebe9e4] px-4 py-5 font-[Poppins] cursor-default sm:px-5 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

        <StudentCard
          {...student}
          {...attendance}
        />

        {/* Development Cards */}
        <div className="flex flex-col gap-3">
          <h2 className="flex items-center gap-1.5 px-1 text-xs font-[PoppinsBold] uppercase text-[#9caf7d] sm:gap-2 sm:text-sm">
            <GraduationCap size={16} />
            Grades
          </h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {gradesData.map((development) => (
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

      {/* Grade Modal */}
      {selectedDevelopment && (
        <GradeModal
          title={selectedDevelopment}
          items={gradesData.find(({ title }) => title === selectedDevelopment)?.grades || []}
          quarters={QUARTERS}
          selectedQuarter={selectedQuarter}
          onQuarterChange={setSelectedQuarter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default Grades;
