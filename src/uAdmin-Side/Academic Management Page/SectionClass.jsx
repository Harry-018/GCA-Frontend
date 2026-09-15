import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import ClassCard from "../../Components/AdminComponents/Academic Management/Section/SectionClass/ClassCard";
import AddSectionModal from "../../Components/AdminModal/AcademicManagementPage/AddSectionModal";
import RenameClassModal from "../../Components/AdminModal/AcademicManagementPage/RenameClassModal";
import RemoveSectionModal from "../../Components/AdminModal/AcademicManagementPage/RemoveSectionModal";
import ScheduleModal from "../../Components/AdminModal/AcademicManagementPage/ScheduleModal";
import {
  getSectionsForLevel,
  saveSectionsForLevel,
} from "../../utils/data/Admin/sections";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const classData = [
  {
    id: 1,
    section: "Sampaguita",
  },
];

const teachers = [
  {
    id: 1,
    name: "Juan Dela Cruz",
  },
  {
    id: 2,
    name: "Maria Santos",
  },
];

const SectionClass = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "Section";

  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [classes, setClasses] = useState(() => {
    const stored = getSectionsForLevel(level);
    return stored.length > 0 ? stored : classData;
  });

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState(null);
  const [newName, setNewName] = useState("");

  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState(null);

  const handleAddSection = () => {
    setIsAddSectionOpen(true);
  };

  const handleCreateSection = () => {
    if (!sectionName.trim()) return;

    const next = [
      ...classes,
      { id: Date.now(), section: sectionName.trim() },
    ];
    setClasses(next);
    saveSectionsForLevel(level, next);
    setIsAddSectionOpen(false);
    setSectionName("");
    setTeacher("");
  };

  const handleEdit = (section) => {
    setRenameTarget(section);
    setNewName(section.section);
    setIsRenameOpen(true);
  };

  const handleRename = () => {
    if (!newName.trim() || !renameTarget) return;

    const next = classes.map((item) =>
      item.id === renameTarget.id
        ? { ...item, section: newName.trim() }
        : item
    );
    setClasses(next);
    saveSectionsForLevel(level, next);
    setIsRenameOpen(false);
    setRenameTarget(null);
    setNewName("");
  };

  const handleDelete = (item) => {
    setRemoveTarget(item);
    setIsRemoveOpen(true);
  };

  const handleRemove = () => {
    if (!removeTarget) return;

    const next = classes.filter((item) => item.id !== removeTarget.id);
    setClasses(next);
    saveSectionsForLevel(level, next);
    setIsRemoveOpen(false);
    setRemoveTarget(null);
  };

  const handleSchedule = (item) => {
    setScheduleTarget(item);
    setIsScheduleOpen(true);
  };

  const handleClassInformation = (item) => {
    navigate(
      `/admin/academic/sectionInformation?level=${encodeURIComponent(
        level
      )}&section=${encodeURIComponent(item.section)}`
    );
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
        <Header 
            navItems={NAV_ITEMS} 
        />

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex items-center gap-x-3">
            <h1 className="font-[PoppinsBold] text-lg text-swamp-green">
              {level}
            </h1>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={() => navigate("/admin/academic/section")}
              className="h-8 rounded-full border border-gray-300 bg-white px-4 text-[11px] text-gray-500 hover:bg-gray-100"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={handleAddSection}
              className="h-8 rounded-full bg-swamp-green px-4 font-[PoppinsBold] text-[11px] text-white hover:bg-[#899d6d]"
            >
              + Add Section
            </button>
          </div>
        </div>

        {/* Class Cards */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {classes.map((item) => (
            <ClassCard
              key={item.id}
              section={item.section}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
              onSchedule={() => handleSchedule(item)}
              onClassInformation={() =>
                handleClassInformation(item)
              }
            />
          ))}
        </div>
      </div>

        <AddSectionModal
            isOpen={isAddSectionOpen}
            onClose={() => setIsAddSectionOpen(false)}
            sectionName={sectionName}
            teacher={teacher}
            teachers={teachers}
            onSectionNameChange={setSectionName}
            onTeacherChange={setTeacher}
            onCreate={handleCreateSection}
        />

        <RenameClassModal
            isOpen={isRenameOpen}
            onClose={() => setIsRenameOpen(false)}
            className={renameTarget ? renameTarget.section : ""}
            newName={newName}
            onNameChange={setNewName}
            onRename={handleRename}
        />

        <RemoveSectionModal
            isOpen={isRemoveOpen}
            onClose={() => setIsRemoveOpen(false)}
            sectionName={removeTarget ? removeTarget.section : ""}
            onRemove={handleRemove}
        />

        <ScheduleModal
            isOpen={isScheduleOpen}
            onClose={() => setIsScheduleOpen(false)}
            sectionName={scheduleTarget ? scheduleTarget.section : ""}
        />
    </div>
  );
};

export default SectionClass;