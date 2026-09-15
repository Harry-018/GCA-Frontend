import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Loader2} from "lucide-react";
import {
  getGradeReportStudents,
  getDevelopments,
  getRemarks,
  getQuarters,
} from "../utils/data/Teacher/grades";
import GradesHeader from "../Components/GradesReport/GradesHeader";
import QuarterSelector from "../Components/GradesReport/QuarterSelector";
import TeacherRemarks from "../Components/GradesReport/TeacherRemarks";
import DevelopmentCards from "../Components/GradesReport/DevelopmentCards";

const QUARTERS = getQuarters();
const ALL_DEVELOPMENTS = getDevelopments();
const ALL_REMARKS = getRemarks();
const ALL_STUDENTS = getGradeReportStudents();

const GradesReport = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const [student] = useState(
    ALL_STUDENTS.find((s) => s.schoolId === schoolId) ||
      ALL_STUDENTS[0]
  );

  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [remark, setRemark] = useState(ALL_REMARKS[1] || "");
  const [developments, setDevelopments] = useState(ALL_DEVELOPMENTS[1] || []);

  useEffect(() => {
    setRemark(ALL_REMARKS[selectedQuarter] || "");
    setDevelopments(ALL_DEVELOPMENTS[selectedQuarter] || []);
  }, [selectedQuarter]);

  // Backend-ready state
  const [loading] = useState(false);
  const [error, setError] = useState("");

  // Ready for backend
  useEffect(() => {
    const loadGrades = async () => {
      try {
        // Temporary data is still being used.
        // Replace this with your actual API later.

        /*
        const response = await axios.get(
          `http://localhost:5000/teacher/grades/${schoolId}`
        );

        setStudent(response.data.student);
        setSelectedQuarter(response.data.selectedQuarter);
        setRemark(response.data.remark);
        setDevelopments(response.data.developments);
        */

        console.log("Grades page ready for backend:", schoolId);
      } catch (error) {
        console.error("Failed to load grades:", error);
        setError("Unable to load grades.");
      }
    };

    loadGrades();
  }, [schoolId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuarterChange = (quarter) => {
    setSelectedQuarter(quarter);
  };

  const handleSaveQuarter = async () => {
    try {
      /*
      await axios.put(
        `http://localhost:5000/teacher/grades/${schoolId}/quarter`,
        {
          quarter: selectedQuarter,
        }
      );
      */

      console.log("Saved quarter:", selectedQuarter);
    } catch (error) {
      console.error("Failed to save quarter:", error);
    }
  };

  const handleSaveRemark = async (updatedRemark) => {
    try {
      setRemark(updatedRemark);

      /*
      await axios.put(
        `http://localhost:5000/teacher/grades/${schoolId}/remark`,
        {
          quarter: selectedQuarter,
          remark: updatedRemark,
        }
      );
      */

      console.log("Updated remark:", updatedRemark);
    } catch (error) {
      console.error("Failed to save remark:", error);
    }
  };

  const handleGradeChange = async (
    devId,
    skillIndex,
    newGrade
  ) => {
    // Update temporary data/UI
    setDevelopments((prev) =>
      prev.map((dev) =>
        dev.id === devId
          ? {
              ...dev,
              grades: dev.grades.map((skill, i) =>
                i === skillIndex
                  ? {
                      ...skill,
                      grade: newGrade,
                    }
                  : skill
              ),
            }
          : dev
      )
    );

    try {
      /*
      await axios.put(
        `http://localhost:5000/teacher/grades/${schoolId}`,
        {
          quarter: selectedQuarter,
          developmentId: devId,
          skillIndex,
          grade: newGrade,
        }
      );
      */

      console.log("Updated grade:", newGrade);
    } catch (error) {
      console.error("Failed to save grade:", error);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-black font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
        <p className="text-sm text-gray-400">
          Loading Grades Report
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
        <p className="text-sm text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen cursor-default bg-[#ebe9e4] px-3 py-4 font-[Poppins] sm:px-5 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">

        <GradesHeader
          student={student}
          onBack={handleBack}
        />

        <QuarterSelector
          quarters={QUARTERS}
          selectedQuarter={selectedQuarter}
          onQuarterChange={handleQuarterChange}
          onSave={handleSaveQuarter}
        />

        <TeacherRemarks
          remark={remark}
          onSave={handleSaveRemark}
        />

        <DevelopmentCards
          developments={developments}
          onGradeChange={handleGradeChange}
        />

      </div>
    </div>
  );
};

export default GradesReport;