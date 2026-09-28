import React from "react";

const AddSectionModal = ({
  isOpen,
  onClose,
  sectionNames = [],
  teachers = [],
  sectionNameId,
  teacherId,
  onSectionNameChange,
  onTeacherChange,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5">
      <div className="flex max-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col gap-y-5 overflow-y-auto rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
        <h2 className="font-[PoppinsBold] text-base text-[#9caf7e]">
          Assign Section
        </h2>

        <div className="flex flex-col gap-y-1">
          <label className="text-xs text-gray-600">Section:</label>

          <select
            value={sectionNameId}
            onChange={(event) => onSectionNameChange(event.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-500 outline-none focus:border-[#9caf7e]"
          >
            <option value="">Select Section</option>

            {sectionNames.map((item) => (
              <option key={item.section_name_id} value={item.section_name_id}>
                {item.section_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-y-1">
          <label className="text-xs text-gray-600">Assign Teacher:</label>

          <select
            value={teacherId}
            onChange={(event) => onTeacherChange(event.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-500 outline-none focus:border-[#9caf7e]"
          >
            <option value="">Select Teacher</option>

            {teachers.map((item) => (
              <option key={item.teacher_id} value={item.teacher_id}>
                {item.first_name} {item.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 flex-1 rounded-full border border-gray-300 bg-transparent font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onCreate}
            disabled={!sectionNameId || !teacherId}
            className={`h-9 flex-1 rounded-full font-[PoppinsBold] text-xs text-white transition ${
              !sectionNameId || !teacherId
                ? "cursor-not-allowed bg-gray-300"
                : "bg-[#9caf7e] hover:bg-[#899d6d]"
            }`}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;
