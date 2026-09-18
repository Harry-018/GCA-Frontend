import React, { useEffect, useState } from "react";

const EditYearModal = ({
  isOpen,
  onClose,
  onEdit,
  schoolYearData,
}) => {
  const [formData, setFormData] = useState({
    schoolYear: "",
    status: "Draft",
    start: "",
    end: "",
  });

  // Set form values when the selected school year changes
  useEffect(() => {
    if (schoolYearData) {
      setFormData({
        schoolYear: schoolYearData.schoolYear || "",
        status: schoolYearData.status || "Draft",
        start: schoolYearData.start || "",
        end: schoolYearData.end || "",
      });
    }
  }, [schoolYearData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-4 pt-4">

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
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs outline-none focus:border-[#91a77a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-2xs text-gray-600">
                Status:
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 font-[Poppins] text-2xs text-gray-600 outline-none focus:border-[#91a77a]"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

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