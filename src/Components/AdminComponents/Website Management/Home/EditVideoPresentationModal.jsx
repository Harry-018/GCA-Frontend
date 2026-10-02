import React from "react";

const EditVideoPresentationModal = ({
  videoTitle = "Grace Christian Learning Hymn",
  video = "",
  onChange,
  onClose,
  onSave,
}) => {
  return (
    <div className="w-full max-w-105 rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-md">
      <h2 className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green">
        Edit Video Presentation
      </h2>

      {/* Video Title */}
      <div className="flex flex-col gap-2 pt-5">
        <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
          Video Title:
        </label>

        <input
          type="text"
          value={videoTitle}
          onChange={(e) => onChange?.("videoTitle", e.target.value)}
          placeholder="Grace Christian Learning Hymn"
          className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-3 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
        />
      </div>

      {/* Upload Video */}
      <div className="flex flex-col gap-2 pt-5">
        <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
          Upload Video:
        </label>

        <input
          type="text"
          value={video}
          onChange={(e) => onChange?.("video", e.target.value)}
          placeholder="Upload Video max 100mb"
          className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-3 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[#bcbcbc] px-5 py-3 font-[Poppins] text-[9px] sm:text-xs font-semibold text-[#555555] transition hover:bg-white"
        >
          Close
        </button>

        <button
          type="button"
          onClick={onSave}
          className="rounded-full bg-swamp-green px-5 py-3 font-[Poppins] text-[9px] sm:text-xs font-semibold text-white transition hover:bg-lime-green"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditVideoPresentationModal;