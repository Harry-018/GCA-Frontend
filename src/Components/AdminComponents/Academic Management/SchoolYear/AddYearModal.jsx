import React, { useState } from "react";

const INITIAL_FORM = {
  schoolYear: "",
  start: "",
  end: "",
  enrollment_status: "closed",
};

const AddYearModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "start" || name === "end") {
        if (updated.start && updated.end) {
          const startYear = new Date(`${updated.start}T00:00:00`).getFullYear();

          const endYear = new Date(`${updated.end}T00:00:00`).getFullYear();

          updated.schoolYear = `${startYear}-${endYear}`;
        } else {
          updated.schoolYear = "";
        }
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd?.(formData);

    setFormData(INITIAL_FORM);
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-sm font-semibold text-[#91a77a]">
          Add School Year
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
          {/* School Year and Enrollment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-2xs text-gray-600">
                School Year:
              </label>

              <input
                type="text"
                name="schoolYear"
                value={formData.schoolYear}
                placeholder="----"
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-2 py-1 font-[Poppins] text-2xs text-gray-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-2xs text-gray-600">
                Enrollment:
              </label>

              <select
                name="enrollment_status"
                value={formData.enrollment_status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-500 outline-none focus:border-[#91a77a]"
              >
                <option value="closed">Closed</option>
                <option value="open">Open</option>
              </select>
            </div>
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-2xs text-gray-600">
                School Start:
              </label>

              <input
                type="date"
                name="start"
                value={formData.start}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-500 outline-none focus:border-[#91a77a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-2xs text-gray-600">
                School End:
              </label>

              <input
                type="date"
                name="end"
                value={formData.end}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-500 outline-none focus:border-[#91a77a]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 rounded-full border border-gray-300 py-1.5 font-[Poppins] text-xs font-semibold text-gray-500 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 rounded-full bg-[#91a77a] py-1.5 font-[Poppins] text-xs font-semibold text-white transition hover:bg-[#7d9367]"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddYearModal;
