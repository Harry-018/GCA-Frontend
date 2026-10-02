import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Pencil, Plus } from "lucide-react";

const SubjectModal = () => {
  const navigate = useNavigate();
  const { gradeLevelId } = useParams();

  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectName, setSubjectName] = useState("");

  const gradeLevelName = subjects[0]?.grade_level_name ?? "Grade Level";

  const openAddModal = () => {
    setEditingSubject(null);
    setSubjectName("");
    setShowModal(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setSubjectName(subject.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setSubjectName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = subjectName.trim();

    if (!name) return;

    if (editingSubject) {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === editingSubject.id ? { ...subject, name } : subject,
        ),
      );
    } else {
      setSubjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          name,
        },
      ]);
    }

    closeModal();
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 bg-[#ebe9e4]  font-[Poppins]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-[PoppinsBold] text-base text-swamp-green sm:text-lg">
            {gradeLevelName} Subjects
          </h1>

          <p className="text-sm text-egg-dark">
            Manage the master subjects for {gradeLevelName}.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/settings/subjects")}
            className="flex items-center text-xs justify-center rounded-full text-gray-500 transition bg-white px-3 hover:opacity-60 border border-ashlight/50"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="flex h-9 items-center gap-2 rounded-full bg-swamp-green px-4 text-xs text-white transition hover:bg-lime-green"
          >
            Add Subject
          </button>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="group rounded-2xl border border-gray-200 bg-bone h-36 flex flex-col justify-between p-5 shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center gap-2">
              <h2 className=" font-[PoppinsBold] text-base text-gray-700">
                {subject.name}
              </h2>
              <button
                type="button"
                onClick={() => openEditModal(subject)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-swamp-green"
                title="Rename subject"
              >
                <Pencil size={15} />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/settings/subjects/${gradeLevelId}/${subject.id}/skills`,
                )
              }
              className="mt-4 text-sm bg-swamp-green w-full text-egg px-3 py-1.5 rounded-2xl hover:opacity-75"
            >
              Manage skills
            </button>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl bg-[#f4f5fc] p-6 shadow-lg"
          >
            <h2 className="font-[PoppinsBold] text-base text-swamp-green">
              {editingSubject ? "Rename Subject" : "Add Subject"}
            </h2>

            <div className="mt-5">
              <label className="text-xs text-gray-500">Subject Name</label>

              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                autoFocus
                className="mt-2 h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none focus:border-swamp-green"
                placeholder="Enter subject name"
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
                className="h-9 flex-1 rounded-full bg-swamp-green text-xs text-white"
              >
                {editingSubject ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubjectModal;
