import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import GradeLevelCard from "../../Components/AdminComponents/Academic Management/GradeLevel/GradeLevelCard";
import AddSubjectModal from "../../Components/AdminComponents/Academic Management/GradeLevel/AdSubjectModal";
import RenameSubjectModal from "../../Components/AdminComponents/Academic Management/GradeLevel/RenameSubjectModal";
import RemoveSubjectModal from "../../Components/AdminComponents/Academic Management/GradeLevel/RemoveSubjectModal";
import { getSubjects } from "./GradeLevels";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const SCHOOL_YEAR = "2026 - 2027";

const CoreSubjects = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "Grade Level";

  const initialSubjects = (getSubjects()[level] ?? []).map((name, index) => ({
    id: index + 1,
    name,
  }));

  const [subjects, setSubjects] = useState(initialSubjects);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  const handleAdd = () => {
    if (!newName.trim()) return;
    setSubjects((prev) => [...prev, { id: Date.now(), name: newName.trim() }]);
    setIsAddOpen(false);
    setNewName("");
  };

  const handleRename = () => {
    if (!renameValue.trim() || !renameTarget) return;
    setSubjects((prev) =>
      prev.map((item) =>
        item.id === renameTarget.id ? { ...item, name: renameValue.trim() } : item
      )
    );
    setIsRenameOpen(false);
    setRenameTarget(null);
    setRenameValue("");
  };

  const handleRemove = () => {
    if (!removeTarget) return;
    setSubjects((prev) => prev.filter((item) => item.id !== removeTarget.id));
    setIsRemoveOpen(false);
    setRemoveTarget(null);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col py-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl py-2 font-[Poppins]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[PoppinsBold] text-sm text-swamp-green sm:text-base">
            <h2>{level} :</h2>

            <span className="font-[Poppins] text-xs text-gray-600 sm:text-sm">
              S.Y {SCHOOL_YEAR}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <button
              type="button"
              onClick={() => navigate("/admin/academic/grade-levels")}
              className="h-8 shrink-0 rounded-full border border-gray-300 bg-white px-4 text-[11px] text-gray-500 hover:bg-gray-100"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="h-8 shrink-0 rounded-full bg-swamp-green px-4 text-[11px] font-[PoppinsBold] text-white hover:bg-[#899d6d]"
            >
              + Add Subject
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((subject) => (
            <GradeLevelCard
              key={subject.id}
              name={subject.name}
              onSkills={() =>
                navigate(
                  `/admin/academic/skills?level=${encodeURIComponent(
                    level
                  )}&subject=${encodeURIComponent(subject.name)}`
                )
              }
              onRename={() => {
                setRenameTarget(subject);
                setRenameValue(subject.name);
                setIsRenameOpen(true);
              }}
              onRemove={() => {
                setRemoveTarget(subject);
                setIsRemoveOpen(true);
              }}
            />
          ))}
        </div>

        {subjects.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No subjects available for this grade level.
          </div>
        )}
      </div>

      <AddSubjectModal
        isOpen={isAddOpen}
        subjectName={newName}
        onChange={(event) => setNewName(event.target.value)}
        onCancel={() => {
          setIsAddOpen(false);
          setNewName("");
        }}
        onAdd={handleAdd}
      />

      <RenameSubjectModal
        isOpen={isRenameOpen}
        subjectName={renameValue}
        onChange={(event) => setRenameValue(event.target.value)}
        onCancel={() => setIsRenameOpen(false)}
        onSave={handleRename}
      />

      <RemoveSubjectModal
        isOpen={isRemoveOpen}
        subjectName={removeTarget ? removeTarget.name : ""}
        onCancel={() => setIsRemoveOpen(false)}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default CoreSubjects;