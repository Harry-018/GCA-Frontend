import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingHeader from "../Components/AdminComponents/Settings/SettingHeader.jsx";

import {
  getAllSubjects,
  createSubject,
  renameSubject,
  removeSubject,
} from "../requests/settingsRequests.js";
import { Pencil } from "lucide-react";

const AdminSubjects = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectName, setSubjectName] = useState("");

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removingSubject, setRemovingSubject] = useState(null);

  const loadSubjects = async () => {
    try {
      setLoading(true);

      const data = await getAllSubjects();

      setSubjects(data);
    } catch (error) {
      console.error("Failed to load subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const openAddModal = () => {
    setEditingSubject(null);
    setSubjectName("");
    setShowModal(true);
  };

  const openRenameModal = (subject) => {
    setEditingSubject(subject);
    setSubjectName(subject.subject_name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setSubjectName("");
  };

  const openRemoveModal = (subject) => {
    setRemovingSubject(subject);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
    setRemovingSubject(null);
  };

  const handleRemoveSubject = async () => {
    if (!removingSubject) return;

    try {
      await removeSubject(removingSubject.subject_id);

      await loadSubjects();

      closeRemoveModal();
    } catch (error) {
      console.error("Failed to remove subject:", error);

      alert(error.response?.data?.message || "Failed to remove subject.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = subjectName.trim();

    if (!name) return;

    try {
      if (editingSubject) {
        await renameSubject(editingSubject.subject_id, {
          subject_name: name,
        });
      } else {
        await createSubject({
          subject_name: name,
        });
      }

      await loadSubjects();
      closeModal();
    } catch (error) {
      console.error("Failed to save subject:", error);

      alert(error.response?.data?.message || "Failed to save subject.");
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 bg-[#ebe9e4] font-[Poppins]">
      <SettingHeader />

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-[PoppinsBold] text-base text-swamp-green sm:text-lg">
            Subjects
          </h1>

          <p className="text-sm text-egg-dark/75">
            Manage the master subjects used throughout the academic system.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex h-9 items-center gap-2 rounded-full bg-swamp-green px-4 text-xs text-white transition hover:bg-lime-green"
        >
          Add Subject
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading subjects...
        </div>
      ) : subjects.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-bone p-8 text-center text-sm text-gray-500">
          No subjects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((subject) => (
            <div
              key={subject.subject_id}
              className="flex h-36 flex-col justify-between rounded-2xl border border-gray-200 bg-bone p-5 shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-[PoppinsBold] text-base text-swamp-green">
                  {subject.subject_name}
                </h2>

                <button
                  type="button"
                  onClick={() => openRenameModal(subject)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-swamp-green"
                  title="Rename subject"
                >
                  <Pencil size={15} />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/settings/subjects/${subject.subject_id}/skills`,
                    )
                  }
                  className="w-full rounded-2xl bg-swamp-green px-3 py-1.5 text-sm text-egg hover:opacity-75"
                >
                  Manage Skills
                </button>
                <button
                  type="button"
                  onClick={() => openRemoveModal(subject)}
                  className="rounded-2xl bg-reject px-3 py-1.5 text-sm text-egg hover:opacity-75"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl bg-[#f4f5fc] p-6 shadow-lg"
          >
            <h2 className="font-[PoppinsBold] text-base text-swamp-green">
              {editingSubject ? "Rename Subject" : "Add New Subject"}
            </h2>

            <div className="mt-5">
              <label className="text-xs text-gray-500">Subject Name</label>

              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Enter subject name"
                autoFocus
                className="mt-2 h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none focus:border-swamp-green"
              />
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="h-9 flex-1 rounded-full border border-gray-300 text-xs text-gray-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!subjectName.trim()}
                className="h-9 flex-1 rounded-full bg-swamp-green text-xs text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {editingSubject ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
      {showRemoveModal && removingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
            <h2 className="font-[PoppinsBold] text-base text-reject">
              Remove Subject
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-[PoppinsBold] text-gray-700">
                "{removingSubject.subject_name}"
              </span>
              ?
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              This subject will be archived and will no longer appear in the
              active master subject list.
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
                onClick={handleRemoveSubject}
                className="h-9 flex-1 rounded-full bg-reject text-xs text-white transition hover:opacity-75"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubjects;
