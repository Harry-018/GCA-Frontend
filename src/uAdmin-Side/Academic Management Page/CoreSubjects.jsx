import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import GradeLevelCard from "../../Components/AdminComponents/Academic Management/GradeLevel/GradeLevelCard";
import AddSubjectModal from "../../Components/AdminComponents/Academic Management/GradeLevel/AdSubjectModal";
import RenameSubjectModal from "../../Components/AdminComponents/Academic Management/GradeLevel/RenameSubjectModal";
import RemoveSubjectModal from "../../Components/AdminComponents/Academic Management/GradeLevel/RemoveSubjectModal";
import {
  getSubjectsByGradeLevel,
  getSubjectsInGradeLevel,
  addSubjectsToGradeLevel,
  removeSubjectFromGradeLevel,
} from "../../requests/academicManagementRequests";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const CoreSubjects = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const syGradeLevelId = searchParams.get("sy_grade_level_id");
  const level = searchParams.get("level") || "Grade Level";

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  const assignedSubjectIds = new Set(
    subjects.map((subject) => Number(subject.subject_id)),
  );

  const selectableSubjects = availableSubjects.filter(
    (subject) => !assignedSubjectIds.has(Number(subject.subject_id)),
  );

  const loadSubjects = async () => {
    if (!syGradeLevelId) return;

    try {
      setLoading(true);

      const assignedSubjects = await getSubjectsInGradeLevel(syGradeLevelId);

      const availableSubjects = await getSubjectsByGradeLevel(syGradeLevelId);

      setSubjects(assignedSubjects);
      setAvailableSubjects(availableSubjects);
    } catch (error) {
      console.error("Failed to load subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, [syGradeLevelId]);

  const handleAdd = async () => {
    if (selectedSubjectIds.length === 0 || !syGradeLevelId) return;

    try {
      await addSubjectsToGradeLevel({
        sy_grade_level_id: Number(syGradeLevelId),
        subject_ids: selectedSubjectIds,
      });

      setIsAddOpen(false);
      setSelectedSubjectIds([]);

      await loadSubjects();
    } catch (error) {
      console.error("Failed to add subjects:", error);
    }
  };

  const handleRename = () => {
    if (!renameValue.trim() || !renameTarget) return;

    /*
      DO NOT send this yet.

      subjects.subject_name is a shared subject record.
      Renaming it here could rename the subject everywhere
      it is used.
    */

    console.log("Rename subject:", renameTarget);
  };

  const handleRemove = async () => {
    if (!removeTarget) return;

    try {
      await removeSubjectFromGradeLevel(removeTarget.sy_gradelevel_subject_id);

      setIsRemoveOpen(false);
      setRemoveTarget(null);

      await loadSubjects();
    } catch (error) {
      console.error("Failed to remove subject:", error);
    }
  };

  const handleSubjectToggle = (subjectId) => {
    const id = Number(subjectId);

    setSelectedSubjectIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col  bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-2 py-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl py-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[PoppinsBold] text-sm text-swamp-green sm:text-[14px]">
            <h2>{level} :</h2>

            <span className="font-[Poppins] text-xs text-gray-600 sm:text-[14px]">
              Core Subjects
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <button
              type="button"
              onClick={() => navigate("/admin/academic/grade-levels")}
              className="h-8 shrink-0 rounded-full border border-gray-300 bg-white px-4 text-[12px] text-gray-500 hover:bg-gray-100"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedSubjectIds([]);
                setIsAddOpen(true);
              }}
              className="h-8 shrink-0 rounded-full bg-swamp-green px-4 text-[12px] font-[Poppins] text-white hover:bg-[#899d6d]"
            >
              Assign Subjects
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-400">
            Loading subjects...
          </div>
        ) : subjects.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            No subjects available for this grade level.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects.map((subject) => (
              <GradeLevelCard
                key={subject.sy_gradelevel_subject_id}
                name={subject.subject_name}
                onSkills={() =>
                  navigate(
                    `/admin/academic/skills?sy_gradelevel_subject_id=${subject.sy_gradelevel_subject_id}&subject_id=${subject.subject_id}&sy_grade_level_id=${syGradeLevelId}&level=${encodeURIComponent(
                      level,
                    )}&subject=${encodeURIComponent(subject.subject_name)}`,
                  )
                }
                onRename={() => {
                  setRenameTarget(subject);
                  setRenameValue(subject.subject_name);
                  setIsRenameOpen(true);
                }}
                onRemove={() => {
                  setRemoveTarget(subject);
                  setIsRemoveOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <AddSubjectModal
        isOpen={isAddOpen}
        subjects={selectableSubjects}
        selectedSubjectIds={selectedSubjectIds}
        onToggle={handleSubjectToggle}
        onCancel={() => {
          setIsAddOpen(false);
          setSelectedSubjectIds([]);
        }}
        onAdd={handleAdd}
      />

      <RenameSubjectModal
        isOpen={isRenameOpen}
        subjectName={renameValue}
        onChange={(event) => setRenameValue(event.target.value)}
        onCancel={() => {
          setIsRenameOpen(false);
          setRenameTarget(null);
          setRenameValue("");
        }}
        onSave={handleRename}
      />

      <RemoveSubjectModal
        isOpen={isRemoveOpen}
        subjectName={removeTarget?.subject_name || ""}
        onCancel={() => {
          setIsRemoveOpen(false);
          setRemoveTarget(null);
        }}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default CoreSubjects;
