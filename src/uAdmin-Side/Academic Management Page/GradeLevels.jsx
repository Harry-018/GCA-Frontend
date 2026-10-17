import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getSchoolYears,
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

  const [schoolYears, setSchoolYears] = useState([]);
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState("");
  const [schoolYearsLoading, setSchoolYearsLoading] = useState(true);

  const [gradeLevels, setGradeLevels] = useState([]);
  const [allGradeLevels, setAllGradeLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("");

  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removeError, setRemoveError] = useState("");

  const [savingAdd, setSavingAdd] = useState(false);
  const [savingRemove, setSavingRemove] = useState(false);

  // Load school years and master grade levels.
  useEffect(() => {
    const initializePage = async () => {
      try {
        setSchoolYearsLoading(true);
        setPageError("");

        const [schoolYearResult, activeYearResult, masterGradeLevels] =
          await Promise.all([
            getSchoolYears({ status: "all", page: 1, limit: 10 }),
            getSchoolYears({ status: "active", page: 1, limit: 10 }),
            getGradeLevels(),
          ]);

        const years = schoolYearResult.data ?? [];
        const activeYear = activeYearResult.data?.[0];

        setSchoolYears(years);
        setAllGradeLevels(masterGradeLevels ?? []);

        if (activeYear) {
          setSelectedSchoolYearId(String(activeYear.school_year_id));
        } else if (years.length > 0) {
          setSelectedSchoolYearId(String(years[0].school_year_id));
        } else {
          setSelectedSchoolYearId("");
          setGradeLevels([]);
        }
      } catch (error) {
        console.error("Failed to initialize grade levels:", error);
        setPageError("Failed to load school years and grade levels.");
      } finally {
        setSchoolYearsLoading(false);
      }
    };

    initializePage();
  }, []);
  // Load assignments for the selected school year.
  useEffect(() => {
    if (!selectedSchoolYearId) {
      setGradeLevels([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadAssignments = async () => {
      try {
        setLoading(true);
        setPageError("");

        const assigned = await getAvailableGradeLevels(
          Number(selectedSchoolYearId),
        );

        if (!cancelled) {
          setGradeLevels(assigned ?? []);
        }
      } catch (error) {
        console.error("Failed to load grade-level assignments:", error);

        if (!cancelled) {
          setGradeLevels([]);
          setPageError("Failed to load grade levels for this school year.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAssignments();

    return () => {
      cancelled = true;
    };
  }, [selectedSchoolYearId]);

  const handleAdd = async () => {
    if (!selectedGradeLevel || !selectedSchoolYearId || savingAdd) return;

    try {
      setSavingAdd(true);
      setPageError("");

      await addGradeLevelToSchoolYear(
        Number(selectedGradeLevel),
        Number(selectedSchoolYearId),
      );

      const updated = await getAvailableGradeLevels(
        Number(selectedSchoolYearId),
      );

      setGradeLevels(updated ?? []);
      setSelectedGradeLevel("");
      setIsAddOpen(false);
    } catch (error) {
      console.error("Failed to add grade level:", error);

      setPageError(
        error.response?.data?.message || "Failed to add grade level.",
      );
    } finally {
      setSavingAdd(false);
    }
  };

  const handleRemove = async () => {
    if (!removeTarget || !selectedSchoolYearId || savingRemove) return;

    try {
      setSavingRemove(true);
      setRemoveError("");

      await removeGradeLevelFromSchoolYear(
        Number(removeTarget.grade_level_id),
        Number(selectedSchoolYearId),
      );

      const updated = await getAvailableGradeLevels(
        Number(selectedSchoolYearId),
      );

      setGradeLevels(updated ?? []);
      setRemoveTarget(null);
      setIsRemoveOpen(false);
    } catch (error) {
      console.error("Failed to remove grade level:", error);

      setRemoveError(
        error.response?.data?.message || "Failed to remove grade level.",
      );
    } finally {
      setSavingRemove(false);
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

      <div className="flex min-h-0 flex-1 flex-col py-2 text-[14px]">
        {/* Reuse the universal toolbar for school-year filtering. */}
        <div className="flex items-center justify-between ">
          <SectionToolbar
            pageTitle="Grade Levels"
            schoolYears={schoolYears}
            selectedSchoolYearId={selectedSchoolYearId}
            onSchoolYearChange={setSelectedSchoolYearId}
            loading={schoolYearsLoading}
          />
          <div className="px-4 w-fit">
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              disabled={!selectedSchoolYearId || loading}
              className="h-8 min-w-fit rounded-full bg-swamp-green px-4 text-[12px] text-white hover:bg-[#899d6d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Grade Level
            </button>
          </div>
        </div>

        {pageError && (
          <p className="px-4 pt-3 text-sm text-red-600">{pageError}</p>
        )}

        {loading || schoolYearsLoading ? (
          <div className="py-12 text-center text-sm text-gray-400">
            Loading grade levels...
          </div>
        ) : gradeLevels.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            No grade levels assigned to this school year.
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 px-4 py-4">
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
        isSubmitting={savingAdd}
      />

      <RemoveGradeLevelModal
        isOpen={isRemoveOpen}
        gradeLevel={removeTarget?.grade_level_name ?? ""}
        errorMessage={removeError}
        onCancel={() => {
          setRemoveTarget(null);
          setRemoveError("");
          setIsRemoveOpen(false);
        }}
        onRemove={handleRemove}
        isSubmitting={savingRemove}
      />
    </div>
  );
};

export default GradeLevels;
