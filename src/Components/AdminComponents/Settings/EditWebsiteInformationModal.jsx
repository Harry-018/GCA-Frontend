import React, { useState } from "react";

const EditWebsiteInformationModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = {
    logo: "",
    schoolName: "Grace Christian Academy",
  },
}) => {
  const [logo, setLogo] = useState(initialData.logo);
  const [schoolName, setSchoolName] = useState(initialData.schoolName);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.({
      logo,
      schoolName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 font-[Poppins]">
      <div className="w-full max-w-83 rounded-2xl bg-[#f4f5fc] px-3.5 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
        <h2 className="text-sm font-semibold text-[#91a875]">
          Edit Website Information
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-5 py-5">
          {/* School Logo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-2xs text-[#555555]">
              School Logo:
            </label>

            <label className="flex h-7 cursor-pointer items-center rounded-md border border-[#c8c8c8] bg-white px-3">
              <span className="text-2xs text-[#999999]">
                {logo ? "Logo Selected" : "Upload Logo"}
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setLogo(file);
                  }
                }}
              />
            </label>
          </div>

          {/* School Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-2xs text-[#555555]">
              School Name:
            </label>

            <input
              type="text"
              value={
                typeof schoolName === "string"
                  ? schoolName
                  : ""
              }
              onChange={(e) => setSchoolName(e.target.value)}
              className="h-7 w-full rounded-md border border-[#c8c8c8] bg-white px-3 text-2xs text-[#555555] outline-none focus:border-[#a0b884]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-7 flex-1 rounded-full border border-[#bdbdbd] bg-transparent text-2xs font-semibold text-[#707070] transition hover:bg-[#e8e8e8]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="h-7 flex-1 rounded-full bg-[#a0b884] text-2xs font-semibold text-white transition hover:bg-[#91a875]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWebsiteInformationModal;