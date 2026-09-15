import React from "react";

const AddSectionModal = ({
  isOpen,
  onClose,
  sectionName,
  teacher,
  teachers,
  onSectionNameChange,
  onTeacherChange,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5">
      <div className="flex w-full max-w-md flex-col gap-y-5 rounded-2xl bg-[#f4f5fc] p-6 shadow-lg">
        <h2 className="font-[PoppinsBold] text-base text-[#9caf7e]">
          Add Section
        </h2>

        {/* Section Name */}
        <div className="flex flex-col gap-y-1">
          <label className="text-xs text-gray-600">
            Section:
          </label>

          <input
            type="text"
            value={sectionName}
            onChange={(event) => onSectionNameChange(event.target.value)}
            placeholder="Create Name"
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-600 outline-none focus:border-[#9caf7e]"
          />
        </div>

        {/* Teacher */}
        <div className="flex flex-col gap-y-1">
          <label className="text-xs text-gray-600">
            Assign Teacher:
          </label>

          <select
            value={teacher}
            onChange={(event) => onTeacherChange(event.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-500 outline-none focus:border-[#9caf7e]"
          >
            <option value="">Select Teacher</option>

            {teachers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
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
            className="h-9 flex-1 rounded-full bg-[#9caf7e] font-[PoppinsBold] text-xs text-white transition hover:bg-[#899d6d]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;