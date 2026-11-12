import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SettingHeader from "../Components/AdminComponents/Settings/SettingHeader";
import SkillModal from "../Components/AdminComponents/Settings/SkillModal";
import DataTable from "../Components/DataTable.jsx";

import {
  getAllSubjects,
  getSkillsBySubject,
  updateSkill,
  removeSkill,
  getArchivedSkillsBySubject,
  reactivateSkill,
} from "../requests/settingsRequests";

const AdminSkills = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const [subject, setSubject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [archivedSkills, setArchivedSkills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [togglingSkillId, setTogglingSkillId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");

  const loadSkills = async () => {
    try {
      setLoading(true);

      const [activeResponse, archivedResponse] = await Promise.all([
        getSkillsBySubject(Number(subjectId)),
        getArchivedSkillsBySubject(Number(subjectId)),
      ]);

      setSkills(activeResponse.data);
      setArchivedSkills(archivedResponse.data);
    } catch (error) {
      console.error("Failed to load skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubject = async () => {
    try {
      const subjects = await getAllSubjects();

      const currentSubject = subjects.find(
        (subject) => subject.subject_id === Number(subjectId),
      );

      setSubject(currentSubject || null);
    } catch (error) {
      console.error("Failed to load subject:", error);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    loadSubject();
    loadSkills();
  }, [subjectId]);

  const handleToggleSkill = async (skill) => {
    if (togglingSkillId !== null) return;

    try {
      setTogglingSkillId(skill.skill_id);

      if (skill.isEnabled) {
        await removeSkill(skill.skill_id);
      } else {
        await reactivateSkill(skill.skill_id);
      }

      await loadSkills();
    } catch (error) {
      console.error("Failed to update skill status:", error);

      alert(
        error.response?.data?.message || "Failed to update skill status.",
      );
    } finally {
      setTogglingSkillId(null);
    }
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setSkillName(skill.skill_name);
    setDescription(skill.description || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSkill(null);
    setSkillName("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = skillName.trim();
    const desc = description.trim();

    if (!editingSkill || !name) return;

    try {
      await updateSkill(editingSkill.skill_id, {
        skill_name: name,
        description: desc,
      });

      await loadSkills();
      closeModal();
    } catch (error) {
      console.error("Failed to save skill:", error);

      alert(error.response?.data?.message || "Failed to save skill.");
    }
  };

  const allSkills = [
    ...skills.map((skill) => ({
      ...skill,
      isEnabled: true,
    })),
    ...archivedSkills.map((skill) => ({
      ...skill,
      isEnabled: false,
    })),
  ].sort((a, b) => a.skill_name.localeCompare(b.skill_name));

  const columns = [
    {
      accessorKey: "skill_name",
      header: "SKILL",
    },
    {
      accessorKey: "description",
      header: "DESCRIPTION",
      cell: ({ getValue }) => (
        <span className="block max-w-xl whitespace-normal">
          {getValue() || "—"}
        </span>
      ),
    },
    {
      accessorKey: "isEnabled",
      header: "STATUS",
      cell: ({ getValue }) => {
        const isEnabled = getValue();

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              isEnabled
                ? "bg-swamp-lite text-lime-dark"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {isEnabled ? "Enabled" : "Disabled"}
          </span>
        );
      },
    },
    {
      id: "edit",
      header: "EDIT",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => openEditModal(row.original)}
          className="shrink-0 whitespace-nowrap rounded-full bg-swamp-green px-4 py-1 text-[11px] text-white transition hover:bg-swamp-green/80 lg:text-xs xl:text-sm"
        >
          Edit
        </button>
      ),
    },
    {
      id: "action",
      header: "ACTION",
      cell: ({ row }) => {
        const skill = row.original;
        const isToggling = togglingSkillId === skill.skill_id;

        return (
          <button
            type="button"
            onClick={() => handleToggleSkill(skill)}
            disabled={isToggling}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1 text-[11px] text-white transition disabled:cursor-not-allowed disabled:opacity-50 lg:text-xs xl:text-sm ${
              skill.isEnabled
                ? "bg-reject hover:bg-reject/80"
                : "bg-swamp-green hover:bg-swamp-green/80"
            }`}
          >
            {skill.isEnabled ? "Disable" : "Enable"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 bg-[#ebe9e4] font-[Poppins]">
      <SettingHeader />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-3">
        <div>
          <h1 className="font-[PoppinsBold] text-base text-swamp-green sm:text-lg">
            {subject?.subject_name || ""} Skills
          </h1>

          <p className="text-sm text-egg-dark/75">
            Enable or disable the skills available for this subject.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/settings/subjects")}
          className="h-8 shrink-0 rounded-full border border-gray-300 bg-bone px-4 text-[11px] text-gray-500 transition hover:bg-gray-100 lg:text-xs xl:text-sm"
        >
          Go Back
        </button>
      </div>

      {/* Skills */}
      <DataTable
        data={allSkills}
        columns={columns}
        loading={loading}
        emptyMessage="No skills available for this subject."
        getRowId={(row) => String(row.skill_id)}
      />

      <SkillModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingSkill={editingSkill}
        skillName={skillName}
        setSkillName={setSkillName}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default AdminSkills;
