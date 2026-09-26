import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getGradeLevels,
  getAvailableGradeLevels,
  addGradeLevelToSchoolYear,
  removeGradeLevelFromSchoolYear,
} from "../../requests/academicManagementRequests";

import Header from "../../Components/AdminComponents/Academic Management/Header";
import SectionToolbar from "../../Components/AdminComponents/Academic Management/Section/SectionToolbar";
import SectionCard from "../../Components/AdminComponents/Academic Management/Schedule/SectionCard";
import AddGradeLevelModal from "../../Components/AdminComponents/Academic Management/GradeLevel/AddGradeModal";
import RemoveGradeLevelModal from "../../Components/AdminComponents/Academic Management/GradeLevel/RemoveGradeLevelModal";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const GradeLevels = () => {
  const navigate = useNavigate();

  const [gradeLevels, setGradeLevels] = useState([]);
  const [allGradeLevels, setAllGradeLevels] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("");
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removeError, setRemoveError] = useState("");

  const loadGradeLevels = async () => {
    try {
      setLoading(true);

      const [assigned, all] = await Promise.all([
        getAvailableGradeLevels(),
        getGradeLevels(),
      ]);

      setGradeLevels(assigned);
      setAllGradeLevels(all);
    } catch (error) {
      console.error("Failed to load grade levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGradeLevels();
  }, []);

  const handleAdd = async () => {
    if (!selectedGradeLevel) return;

    try {
      await addGradeLevelToSchoolYear(Number(selectedGradeLevel));

      setSelectedGradeLevel("");
      setIsAddOpen(false);

      await loadGradeLevels();
    } catch (error) {
      console.error("Failed to add grade level:", error);
    }
  };

  const handleRemove = async () => {
    if (!removeTarget) return;
    try {
      setRemoveError("");
      await removeGradeLevelFromSchoolYear(Number(removeTarget.grade_level_id));
      setRemoveTarget(null);
      setIsRemoveOpen(false);
      await loadGradeLevels();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to remove grade level.";
      setRemoveError(message);
    }
  };

  const assignedIds = new Set(
    gradeLevels.map((grade) => Number(grade.grade_level_id)),
  );

  const availableGradeLevels = allGradeLevels.filter(
    (grade) => !assignedIds.has(Number(grade.grade_level_id)),
  );

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0  text-[14px] flex-1 flex-col py-2">
        <div className="flex items-center justify-between">
          <SectionToolbar schoolYear="2026 - 2027" />

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="h-8 min-w-fit rounded-full bg-swamp-green px-4 text-[12px] font-[Poppins] text-white hover:bg-[#899d6d]"
          >
            Add Grade Level
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-400">
            Loading grade levels...
          </div>
        ) : gradeLevels.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            No grade levels assigned to this school year.
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 py-4">
            {gradeLevels.map((grade) => (
              <SectionCard
                key={grade.sy_grade_level_id}
                gradeLevel={grade.grade_level_name}
                count={Number(grade.subject_count)}
                label="Core Subjects"
                onClick={() =>
                  navigate(
                    `/admin/academic/core-subjects?sy_grade_level_id=${grade.sy_grade_level_id}&level=${encodeURIComponent(
                      grade.grade_level_name,
                    )}`,
                  )
                }
                onRemove={() => {
                  setRemoveTarget(grade);
                  setRemoveError("");
                  setIsRemoveOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <AddGradeLevelModal
        isOpen={isAddOpen}
        gradeLevels={availableGradeLevels}
        selectedGradeLevel={selectedGradeLevel}
        onChange={(event) => setSelectedGradeLevel(event.target.value)}
        onCancel={() => {
          setIsAddOpen(false);
          setSelectedGradeLevel("");
        }}
        onAdd={handleAdd}
      />

      <RemoveGradeLevelModal
        isOpen={isRemoveOpen}
        gradeLevel={removeTarget ? removeTarget.grade_level_name : ""}
        errorMessage={removeError}
        onCancel={() => {
          setRemoveTarget(null);
          setRemoveError("");
          setIsRemoveOpen(false);
        }}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default GradeLevels;
