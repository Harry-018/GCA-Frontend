import React from "react";

const EditVideoModal = ({
  isOpen,
  videoTitle = "",
  video = null,
  onChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] font-semibold text-swamp-green sm:text-sm">
          Edit Video
        </h2>

        {/* Video Title */}
        <div className="flex flex-col gap-1.5 pt-5">
          <label className="font-[Poppins] text-[9px] text-[#555555] sm:text-2xs">
            Video Title:
          </label>

          <input
            type="text"
            value={videoTitle}
            onChange={(e) => onChange?.("videoTitle", e.target.value)}
            placeholder="Grace Christian Learning Hymn"
            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green sm:text-2xs"
          />
        </div>

        {/* Video File */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] text-[#555555] sm:text-2xs">
            Video File:
          </label>

          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => onChange?.("video", e.target.files?.[0] || null)}
            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none sm:text-2xs"
          />

          <p className="font-[Poppins] text-[8px] text-gray-500 sm:text-[10px]">
            Leave empty to keep the current video.
          </p>

          {video && (
            <p className="truncate font-[Poppins] text-[8px] text-gray-600 sm:text-[10px]">
              Selected: {video.name}
            </p>
          )}
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

export default EditVideoModal;
