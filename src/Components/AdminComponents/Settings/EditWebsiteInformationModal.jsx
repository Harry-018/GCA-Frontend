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
      <div className="w-full max-w-83 rounded-2xl bg-linear-to-br from-bone via-white to-parent-pale/60 px-3.5 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
        <h2 className="text-sm font-[PoppinsBold] text-parent-green">
          Edit Website Information
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-5 py-5">
          {/* School Logo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-2xs text-[#555555]">School Logo:</label>

            <label className="flex h-7 cursor-pointer items-center rounded-md border border-parent-accent/25 bg-bone px-3">
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
            <label className="text-2xs text-[#555555]">School Name:</label>

            <input
              type="text"
              value={typeof schoolName === "string" ? schoolName : ""}
              onChange={(e) => setSchoolName(e.target.value)}
              className="h-7 w-full rounded-md border border-parent-accent/25 bg-bone px-3 text-2xs text-[#555555] outline-none focus:border-parent-green"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-7 flex-1 rounded-full border border-parent-accent/30 bg-transparent text-2xs font-[PoppinsBold] text-[#707070] transition hover:bg-parent-accent/10"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="h-7 flex-1 rounded-full bg-parent-green text-2xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWebsiteInformationModal;
