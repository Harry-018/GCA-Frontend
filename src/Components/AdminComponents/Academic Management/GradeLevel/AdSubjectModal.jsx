import React from "react";

const AddSubjectModal = ({
  isOpen,
  subjects = [],
  selectedSubjectIds = [],
  onToggle,
  onCancel,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-sm font-semibold text-swamp-green">
          Add Subjects
        </h2>

        <div className="flex flex-col gap-1 pt-4">
          <label className="font-[Poppins] text-2xs text-gray-600">
            Select Subjects:
          </label>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-300 bg-white">
            {subjects.length === 0 ? (
              <p className="px-3 py-4 text-center font-[Poppins] text-2xs text-gray-400">
                No available subjects.
              </p>
            ) : (
              subjects.map((subject) => {
                const subjectId = Number(subject.subject_id);
                const isSelected = selectedSubjectIds.includes(subjectId);

                return (
                  <label
                    key={subject.subject_id}
                    className="flex cursor-pointer items-center gap-2 border-b border-gray-100 px-3 py-2.5 last:border-b-0 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(subjectId)}
                      className="h-3.5 w-3.5 accent-[#91a77a]"
                    />

                    <span className="font-[Poppins] text-2xs text-gray-600">
                      {subject.subject_name}
                    </span>
                  </label>
                );
              })
            )}
          </div>

          <p className="pt-1 font-[Poppins] text-2xs text-gray-400">
            {selectedSubjectIds.length} subject
            {selectedSubjectIds.length !== 1 ? "s" : ""} selected
          </p>
        </div>

        <div className="flex gap-2 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 rounded-full border border-gray-300 py-1.5 font-[Poppins] text-xs font-semibold text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onAdd}
            disabled={selectedSubjectIds.length === 0}
            className="w-1/2 rounded-full bg-[#91a77a] py-1.5 font-[Poppins] text-xs font-semibold text-white transition hover:bg-[#7d9367] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;
