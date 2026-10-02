import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import SettingHeader from "../Components/AdminComponents/Settings/SettingHeader";
import SkillModal from "../Components/AdminComponents/Settings/SkillModal";

import {
  getAllSubjects,
  getSkillsBySubject,
  createSkill,
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

  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removingSkill, setRemovingSkill] = useState(null);

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

  const openAddModal = () => {
    setEditingSkill(null);
    setSkillName("");
    setDescription("");
    setShowModal(true);
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

  const openRemoveModal = (skill) => {
    setRemovingSkill(skill);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
    setRemovingSkill(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = skillName.trim();
    const desc = description.trim();

    if (!name) return;

    try {
      if (editingSkill) {
        await updateSkill(editingSkill.skill_id, {
          skill_name: name,
          description: desc,
        });
      } else {
        await createSkill({
          subject_id: Number(subjectId),
          skill_name: name,
          description: desc,
        });
      }

      await loadSkills();
      closeModal();
    } catch (error) {
      console.error("Failed to save skill:", error);

      alert(error.response?.data?.message || "Failed to save skill.");
    }
  };

  const handleRemoveSkill = async () => {
    if (!removingSkill) return;

    try {
      await removeSkill(removingSkill.skill_id);

      await loadSkills();
      closeRemoveModal();
    } catch (error) {
      console.error("Failed to remove skill:", error);

      alert(error.response?.data?.message || "Failed to remove skill.");
    }
  };

  const handleReactivateSkill = async (skillId) => {
    try {
      await reactivateSkill(skillId);

      await loadSkills();
    } catch (error) {
      console.error("Failed to reactivate skill:", error);

      alert(error.response?.data?.message || "Failed to reactivate skill.");
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 bg-[#ebe9e4] font-[Poppins]">
      <SettingHeader />

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="">
          <h1 className="font-[PoppinsBold] text-base text-swamp-green sm:text-lg">
            {subject?.subject_name || ""} Skills
          </h1>

          <p className="text-sm text-egg-dark/75">
            Manage the skills and descriptions for this subject.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/settings/subjects")}
            className="flex items-center justify-center rounded-full border border-ashlight/50 bg-white px-3 text-xs text-gray-500 transition hover:opacity-60"
          >
            Go Back
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="flex h-9 items-center gap-2 rounded-full bg-swamp-green px-4 text-xs text-white transition hover:bg-lime-green"
          >
            <Plus size={15} />
            Add Skill
          </button>
        </div>
      </div>

      {/* Skills */}
      {loading ? (
        <div className="flex h-40 items-center justify-center text-xs text-gray-400">
          Loading skills...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.skill_id}
              className="rounded-2xl border border-gray-200 bg-bone p-5 shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-3">
                  <div>
                    <h2 className="font-[PoppinsBold] text-sm text-egg-dark">
                      {skill.skill_name}
                    </h2>

                    <p className="text-xs leading-relaxed text-gray-500">
                      {skill.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(skill)}
                    className="flex items-center justify-center rounded-2xl bg-swamp-green px-3 py-1.5 text-sm text-egg transition hover:opacity-75"
                    title="Edit skill"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => openRemoveModal(skill)}
                    className="flex items-center justify-center rounded-2xl bg-reject px-3 py-1.5 text-sm text-egg transition hover:opacity-75"
                    title="Remove skill"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <div className="col-span-full flex h-40 items-center justify-center rounded-2xl border border-dashed border-gray-300 text-xs text-gray-400">
              No skills added yet.
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
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
      {showRemoveModal && removingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
            <h2 className="font-[PoppinsBold] text-base text-reject">
              Remove Skill
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-[PoppinsBold] text-gray-700">
                "{removingSkill.skill_name}"
              </span>
              ?
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              This skill will be archived and will no longer appear in the
              active skill list.
            </p>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={closeRemoveModal}
                className="h-9 flex-1 rounded-full border border-gray-300 text-xs text-gray-500 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRemoveSkill}
                className="h-9 flex-1 rounded-full bg-reject text-xs text-white transition hover:opacity-75"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {archivedSkills.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-3 font-[PoppinsBold] text-sm text-gray-500">
            Archived Skills
          </h2>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {archivedSkills.map((skill) => (
              <div
                key={skill.skill_id}
                className="rounded-2xl border border-gray-200 bg-gray-100 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-[PoppinsBold] text-sm text-gray-500">
                      {skill.skill_name}
                    </h2>

                    <p className="text-xs leading-relaxed text-gray-400">
                      {skill.description || "No description provided."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReactivateSkill(skill.skill_id)}
                    className="flex items-center justify-center rounded-2xl bg-swamp-green px-3 py-1.5 text-sm text-egg transition hover:opacity-75"
                  >
                    Reactivate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;
