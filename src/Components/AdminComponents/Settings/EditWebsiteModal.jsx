import React from "react";

const EditWebsiteModal = ({
  isOpen,
  website,
  logoPreview,
  onLogoChange,
  onChange,
  onClose,
  onSave,
  saving,
}) => {
  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    const maxSize = 20 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("The logo must not exceed 20 MB.");
      e.target.value = "";
      return;
    }

    onLogoChange?.(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] font-semibold text-swamp-green sm:text-sm md:text-base">
          Edit Website Information
        </h2>

        <div className="flex flex-col gap-3 pt-5">
          {/* School Logo */}
          <div className="flex flex-col gap-2">
            <label className="font-[Poppins] text-[9px] text-[#555555] sm:text-2xs">
              School Logo:
            </label>

            {/* Logo Preview */}
            <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-[#cfcfcf] bg-bone p-4">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="School logo preview"
                  className="max-h-28 max-w-full object-contain"
                />
              ) : (
                <p className="font-[Poppins] text-[9px] text-[#999999] sm:text-2xs">
                  No logo available
                </p>
              )}
            </div>

            {/* File Picker */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={saving}
              className="w-full rounded-lg border border-[#cfcfcf] bg-bone px-3 py-2 font-[Poppins] text-[9px] text-[#555555] file:mr-3 file:rounded-md file:border-0 file:bg-swamp-green file:px-3 file:py-1.5 file:font-[Poppins] file:text-[9px] file:font-semibold file:text-white hover:file:bg-lime-green disabled:cursor-not-allowed disabled:opacity-50 sm:text-2xs"
            />

            <p className="font-[Poppins] text-[9px] text-[#999999] sm:text-2xs">
              Select an image file. Maximum size: 20 MB.
            </p>
          </div>

          {/* School Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] text-[#555555] sm:text-2xs">
              School Name:
            </label>

            <input
              type="text"
              value={website.schoolName}
              onChange={(e) => onChange?.("schoolName", e.target.value)}
              placeholder="Enter school name"
              disabled={saving}
              className="w-full rounded-lg border border-[#cfcfcf] bg-bone px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green disabled:opacity-50 sm:text-2xs"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] font-semibold text-[#555555] transition hover:bg-bone disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] font-semibold text-white transition hover:bg-lime-green disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWebsiteModal;
