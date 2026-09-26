import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import AddSkillModal from "../../Components/AdminComponents/Academic Management/GradeLevel/AddSkillModal";
import RemoveSkillModal from "../../Components/AdminComponents/Academic Management/GradeLevel/RemoveSkillModal";
import DataTable from "../../Components/DataTable";

import {
  getSkillsByGradeLevelSubject,
  getAvailableSkillsByGradeLevelSubject,
  assignSkillsToGradeLevelSubject,
  archiveSkill,
  restoreSkill,
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

const SCHOOL_YEAR = "2026 - 2027";

const Skills = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const syGradeLevelId = searchParams.get("sy_grade_level_id");
  const syGradeLevelSubjectId = searchParams.get("sy_gradelevel_subject_id");
  const level = searchParams.get("level") || "Grade Level";
  const subject = searchParams.get("subject") || "Subject";
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);

  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const loadSkills = async () => {
    if (!syGradeLevelSubjectId) return;
    try {
      setLoading(true);
      const [assigned, available] = await Promise.all([
        getSkillsByGradeLevelSubject(Number(syGradeLevelSubjectId)),
        getAvailableSkillsByGradeLevelSubject(Number(syGradeLevelSubjectId)),
      ]);
      setSkills(assigned);
      setAvailableSkills(available);
    } catch (error) {
      console.error("Failed to load skills:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSkills();
  }, [syGradeLevelSubjectId]);
  const handleSkillToggle = (skillId) => {
    setSelectedSkillIds((current) =>
      current.includes(skillId)
        ? current.filter((id) => id !== skillId)
        : [...current, skillId],
    );
  };
  const handleAssign = async () => {
    if (selectedSkillIds.length === 0 || !syGradeLevelSubjectId) {
      return;
    }
    try {
      await assignSkillsToGradeLevelSubject(
        Number(syGradeLevelSubjectId),
        selectedSkillIds,
      );
      setIsAddOpen(false);
      setSelectedSkillIds([]);
      await loadSkills();
    } catch (error) {
      console.error("Failed to assign skills:", error);
    }
  };

  const handleRemove = (skill) => {
    setRemoveTarget(skill);
    setIsRemoveOpen(true);
  };
  const confirmRemove = async () => {
    if (!removeTarget || !syGradeLevelSubjectId) {
      return;
    }

    try {
      await archiveSkill(
        Number(syGradeLevelSubjectId),
        Number(removeTarget.skill_id),
      );

      setIsRemoveOpen(false);
      setRemoveTarget(null);

      await loadSkills();
    } catch (error) {
      console.error("Failed to archive skill:", error);
      console.error("RESPONSE:", error.response?.data);
    }
  };
  const handleRestore = async (skill) => {
    if (!syGradeLevelSubjectId) return;

    try {
      await restoreSkill(Number(syGradeLevelSubjectId), Number(skill.skill_id));

      await loadSkills();
    } catch (error) {
      console.error("RESTORE REQUEST FAILED:", error);
      console.error("RESPONSE:", error.response?.data);
    }
  };

  const columns = [
    {
      accessorKey: "skill_name",
      header: "Skill",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => row.original.description || "—",
    },
    {
      accessorKey: "skill_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.skill_status;

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs  text-[11px] font-medium ${
              status === "active"
                ? "bg-[#e7eedf] text-[#71865c]"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {status === "active" ? "Active" : "Archived"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const skill = row.original;

        if (skill.skill_status === "archived") {
          return (
            <button
              type="button"
              onClick={() => handleRestore(skill)}
              title="Restore skill"
              className="rounded-full bg-swamp-green px-4 py-1 text-[11px] text-white hover:bg-swamp-green lg:text-xs xl:text-sm"
            >
              Reassign
            </button>
          );
        }

        return (
          <button
            type="button"
            onClick={() => handleRemove(skill)}
            title="Archive skill"
            className="rounded-full bg-[#ff7272] px-4 py-1 text-[11px] text-white hover:bg-[#f45f5f] lg:text-xs xl:text-sm"
          >
            Remove
          </button>
        );
      },
    },
  ];
  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col  bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />
      <div className="flex min-h-0 flex-1 flex-col gap-2 py-4">
        {/* HEADER */}
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
                  `/admin/academic/core-subjects?sy_grade_level_id=${syGradeLevelId}&level=${encodeURIComponent(
                    level,
                  )}`,
                )
              }
              className="h-8 shrink-0 rounded-full border border-gray-300 bg-white px-4 text-[12px] text-gray-500 hover:bg-gray-100"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="h-8 shrink-0 rounded-full bg-swamp-green px-4 text-[12px] font-[Poppins] text-white hover:bg-[#899d6d]"
            >
              Assign Skill
            </button>
          </div>
        </div>
        {/* SKILLS */}
        {loading ? (
          <div className="py-12 text-center text-sm text-gray-400">
            Loading skills...
          </div>
        ) : (
          <DataTable data={skills} columns={columns} />
        )}
      </div>
      {/* ASSIGN SKILL MODAL */}
      <AddSkillModal
        isOpen={isAddOpen}
        skills={availableSkills}
        selectedSkillIds={selectedSkillIds}
        onToggle={handleSkillToggle}
        onCancel={() => {
          setIsAddOpen(false);
          setSelectedSkillIds([]);
        }}
        onAdd={handleAssign}
      />

      {/* ARCHIVE SKILL MODAL */}
      <RemoveSkillModal
        isOpen={isRemoveOpen}
        onCancel={() => {
          setIsRemoveOpen(false);
          setRemoveTarget(null);
        }}
        onRemove={confirmRemove}
      />
    </div>
  );
};
export default Skills;
