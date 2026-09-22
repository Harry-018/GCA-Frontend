import React, { useEffect, useState } from "react";

const getDateValue = (date) => {
  if (!date) return "";

  return new Date(date).toISOString().split("T")[0];
};

const getSchoolYear = (start, end) => {
  if (!start || !end) return "";

  const startYear = new Date(`${start}T00:00:00`).getFullYear();
  const endYear = new Date(`${end}T00:00:00`).getFullYear();

  return `${startYear}-${endYear}`;
};

const EditYearModal = ({ isOpen, onClose, onEdit, schoolYearData }) => {
  const [formData, setFormData] = useState({
    schoolYear: "",
    sy_status: "draft",
    enrollment_status: "open",
    start: "",
    end: "",
  });

  useEffect(() => {
    if (schoolYearData) {
      const start = getDateValue(schoolYearData.start_date);
      const end = getDateValue(schoolYearData.end_date);

      setFormData({
        schoolYear: getSchoolYear(start, end),
        sy_status: schoolYearData.sy_status || "draft",
        enrollment_status: schoolYearData.enrollment_status || "open",
        start,
        end,
      });
    }
  }, [schoolYearData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "start" || name === "end") {
        updated.schoolYear = getSchoolYear(updated.start, updated.end);
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit?.({
      ...schoolYearData,
      ...formData,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-sm font-semibold text-swamp-green">
          Edit School Year
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
          {/* School Year and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-2xs text-gray-600">
                School Year:
              </label>

              <input
                type="text"
                name="schoolYear"
                value={formData.schoolYear}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-2 py-1 font-[Poppins] text-2xs text-gray-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-2xs text-gray-600">
                Status:
              </label>

              <select
                name="sy_status"
                value={formData.sy_status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-600 outline-none focus:border-[#91a77a]"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Enrollment */}
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              Enrollment:
            </label>

            <select
              name="enrollment_status"
              value={formData.enrollment_status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-600 outline-none focus:border-[#91a77a]"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* School Start and End */}
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
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-600 outline-none focus:border-[#91a77a]"
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
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-600 outline-none focus:border-[#91a77a]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 rounded-full border border-gray-300 py-1.5 font-[Poppins] text-xs font-semibold text-gray-500 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 rounded-full bg-[#91a77a] py-1.5 font-[Poppins] text-xs font-semibold text-white transition hover:bg-[#7d9367]"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditYearModal;
