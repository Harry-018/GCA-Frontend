import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import SkillsTable from "../../Components/AdminComponents/Academic Management/GradeLevel/SkillTable";
import AddSkillModal from "../../Components/AdminComponents/Academic Management/GradeLevel/AddSkillModal";
import EditSkillModal from "../../Components/AdminComponents/Academic Management/GradeLevel/EditSkillModal";
import RemoveSkillModal from "../../Components/AdminComponents/Academic Management/GradeLevel/RemoveSkillModal";

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

const DEFAULT_SKILLS = {
  "Physical Development": [
    {
      id: 1,
      skills: "Gross Motor Skills",
      description: "Hopping, Skipping, Catching, Jumping",
    },
    {
      id: 2,
      skills: "Fine Motor Skills",
      description: "Tying Shoes, Pegs, Beads, Crayons, Scissors",
    },
  ],
  "Socio-Emotional Development": [
    {
      id: 1,
      skills: "Social Skills",
      description: "Cooperates with peers, resolves conflicts peacefully",
    },
  ],
  "Cognitive Development": [
    {
      id: 1,
      skills: "Memory Skills",
      description: "Recognizes numbers and letters",
    },
  ],
  "Reading": [
    {
      id: 1,
      skills: "Phonemic Awareness",
      description: "Recognizes letter Sounds",
    },
  ],
  Numbers: [],
  "Arts and Crafts": [],
  "Story Time": [],
  "Music and Movement": [],
  "Spiritual Development": [],
};

const Skills = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "Grade Level";
  const subject = searchParams.get("subject") || "Subject";

  const initialSkills = DEFAULT_SKILLS[subject] ?? [];

  const [skills, setSkills] = useState(initialSkills);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editSkillName, setEditSkillName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  const handleAdd = () => {
    if (!skillName.trim()) return;
    setSkills((prev) => [
      ...prev,
      { id: Date.now(), skills: skillName.trim(), description: description.trim() },
    ]);
    setIsAddOpen(false);
    setSkillName("");
    setDescription("");
  };

  const handleEdit = (skill) => {
    setEditTarget(skill);
    setEditSkillName(skill.skills);
    setEditDescription(skill.description ?? "");
    setIsEditOpen(true);
  };

  const handleSave = () => {
    if (!editSkillName.trim() || !editTarget) return;
    setSkills((prev) =>
      prev.map((item) =>
        item.id === editTarget.id
          ? { ...item, skills: editSkillName.trim(), description: editDescription.trim() }
          : item
      )
    );
    setIsEditOpen(false);
    setEditTarget(null);
  };

  const handleRemove = (skill) => {
    setRemoveTarget(skill);
    setIsRemoveOpen(true);
  };

  const confirmRemove = () => {
    if (!removeTarget) return;
    setSkills((prev) => prev.filter((item) => item.id !== removeTarget.id));
    setIsRemoveOpen(false);
    setRemoveTarget(null);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl py-2 font-[Poppins]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[PoppinsBold] text-sm text-swamp-green sm:text-base">
            <h2>{subject} :</h2>

            <span className="font-[Poppins] text-xs text-gray-600 sm:text-sm">
              S.Y {SCHOOL_YEAR}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/academic/core-subjects?level=${encodeURIComponent(level)}`
                )
              }
              className="h-8 shrink-0 rounded-full border border-gray-300 bg-white px-4 text-[11px] text-gray-500 hover:bg-gray-100"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="h-8 shrink-0 rounded-full bg-swamp-green px-4 text-[11px] font-[PoppinsBold] text-white hover:bg-[#899d6d]"
            >
              + Add Skill
            </button>
          </div>
        </div>

        <SkillsTable subjects={skills} onEdit={handleEdit} onRemove={handleRemove} />
      </div>

      <AddSkillModal
        isOpen={isAddOpen}
        skillName={skillName}
        description={description}
        onSkillNameChange={(event) => setSkillName(event.target.value)}
        onDescriptionChange={(event) => setDescription(event.target.value)}
        onCancel={() => {
          setIsAddOpen(false);
          setSkillName("");
          setDescription("");
        }}
        onAdd={handleAdd}
      />

      <EditSkillModal
        isOpen={isEditOpen}
        skillName={editSkillName}
        description={editDescription}
        onSkillNameChange={(event) => setEditSkillName(event.target.value)}
        onDescriptionChange={(event) => setEditDescription(event.target.value)}
        onCancel={() => setIsEditOpen(false)}
        onSave={handleSave}
      />

      <RemoveSkillModal
        isOpen={isRemoveOpen}
        onCancel={() => setIsRemoveOpen(false)}
        onRemove={confirmRemove}
      />
    </div>
  );
};

export default Skills;