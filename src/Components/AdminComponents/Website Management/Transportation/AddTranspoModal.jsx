import React, { useEffect, useState } from "react";

const AddTranspoModal = ({
  isOpen,
  routeData = null,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    location: "",
    distance: "",
    price: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        location: routeData?.location || "",
        distance: routeData?.distance || "",
        price: routeData?.price || "",
      });
    }
  }, [isOpen, routeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#f8f9ff] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] sm:text-base text-swamp-green">
          {routeData ? "Edit Route" : "Add Route"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-6">
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-[9px] sm:text-xs text-gray-600">
              Location:
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-[9px] sm:text-sm outline-none focus:border-swamp-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-[9px] sm:text-xs text-gray-600">
                Distance:
              </label>

              <input
                type="text"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                required
                className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-[9px] sm:text-sm outline-none focus:border-swamp-green"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-[Poppins] text-[9px] sm:text-xs text-gray-600">
                Price:
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 font-[Poppins] text-[9px] sm:text-sm outline-none focus:border-swamp-green"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 font-[Poppins] text-[9px] sm:text-xs text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-full bg-[#9caf7c] px-4 py-2 font-[Poppins] text-[9px] sm:text-xs text-white"
            >
              {routeData ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTranspoModal;