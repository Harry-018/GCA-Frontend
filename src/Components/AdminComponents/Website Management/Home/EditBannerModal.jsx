import React from "react";

const EditBannerModal = ({
  isOpen,
  title = "",
  quote = "",
  onChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] font-semibold text-swamp-green sm:text-sm">
          Edit Banner
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] text-[#555555] sm:text-2xs">
            Title:
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => onChange?.("title", e.target.value)}
            placeholder="Discover a joyful pre-school journey with faith, play and learning"
            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green sm:text-2xs"
          />
        </div>

        {/* Quote */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] text-[#555555] sm:text-2xs">
            Quote:
          </label>

          <textarea
            value={quote}
            onChange={(e) => onChange?.("quote", e.target.value)}
            rows={3}
            placeholder='"For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God not by works, so that no one can boast". Ephesians 2:8-9(NIV)'
            className="w-full resize-none rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green sm:text-2xs"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] text-[#555555] sm:text-2xs">
            Upload Image:
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange?.("image", e.target.files[0])}
            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none file:mr-3 file:rounded-md file:border-0 file:bg-swamp-green file:px-3 file:py-1 file:font-[Poppins] file:text-[9px] file:text-white hover:file:bg-lime-green sm:text-2xs"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] font-semibold text-[#555555] transition hover:bg-white sm:text-xs"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] font-semibold text-white transition hover:bg-lime-green sm:text-xs"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerModal;
