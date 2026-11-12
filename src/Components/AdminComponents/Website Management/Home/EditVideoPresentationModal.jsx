import React from "react";

const EditVideoPresentationModal = ({
  videoTitle = "Grace Christian Learning Hymn",
  video = "",
  onChange,
  onClose,
  onSave,
}) => {
  return (
    <div className="w-full max-w-105 rounded-2xl border border-parent-accent/20 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-md">
      <h2 className=" text-[9px] sm:text-sm font-[PoppinsBold] text-parent-green">
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
          className="w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-3 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-parent-accent"
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
          className="w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-3 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-parent-accent"
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-parent-accent/30 px-5 py-3 text-[9px] sm:text-xs font-[PoppinsBold] text-[#555555] transition hover:bg-bone"
        >
          Close
        </button>

        <button
          type="button"
          onClick={onSave}
          className="rounded-full bg-parent-green px-5 py-3 text-[9px] sm:text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditVideoPresentationModal;
