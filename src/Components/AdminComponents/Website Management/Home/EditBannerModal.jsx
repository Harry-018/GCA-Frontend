import React from "react";
import { LoaderCircle } from "lucide-react";

const EditBannerModal = ({
  isOpen,
  title = "",
  quote = "",
  onChange,
  onClose,
  onSave,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-parent-accent/20 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-lg">
        <h2 className=" text-[9px] font-[PoppinsBold] text-parent-green sm:text-sm">
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
            className="w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none placeholder:text-[#999999] focus:border-parent-accent sm:text-2xs"
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
            className="w-full resize-none rounded-lg border border-parent-accent/25 bg-bone px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none placeholder:text-[#999999] focus:border-parent-accent sm:text-2xs"
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
            className="w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none file:mr-3 file:rounded-md file:border-0 file:bg-parent-green file:px-3 file:py-1 file:font-[Poppins] file:text-[9px] file:text-white hover:file:bg-parent-green sm:text-2xs"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-parent-accent/30 px-5 py-2 text-[9px] font-[PoppinsBold] text-[#555555] transition hover:bg-bone sm:text-xs"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-full bg-parent-green px-5 py-2 text-[9px] font-[PoppinsBold] text-white transition hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
          >
            {loading ? (
              <>
                <LoaderCircle size={14} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerModal;
