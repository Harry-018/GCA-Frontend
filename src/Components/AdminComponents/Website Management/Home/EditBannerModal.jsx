import React from "react";
import { ChevronDown } from "lucide-react";

const EditBannerModal = ({
  isOpen,
  admissionStatus = "Open",
  schoolYear = "2026 - 2027",
  title = "",
  quote = "",
  image = "",
  onChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const selectStyle =
    "w-full appearance-none rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 pr-7 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none focus:border-lime-green";

  const chevronClass =
    "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green">
          Edit Banner
        </h2>

        {/* Status & School Year */}
        <div className="grid grid-cols-1 gap-3 pt-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              Admission Status:
            </label>

            <div className="relative">
              <select
                value={admissionStatus}
                onChange={(e) =>
                  onChange?.("admissionStatus", e.target.value)
                }
                className={selectStyle}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>

              <ChevronDown size={14} className={chevronClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              School Year:
            </label>

            <div className="relative">
              <select
                value={schoolYear}
                onChange={(e) => onChange?.("schoolYear", e.target.value)}
                className={selectStyle}
              >
                <option value="2026 - 2027">2026 - 2027</option>
                <option value="2027 - 2028">2027 - 2028</option>
                <option value="2028 - 2029">2028 - 2029</option>
              </select>

              <ChevronDown size={14} className={chevronClass} />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
            Title:
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => onChange?.("title", e.target.value)}
            placeholder="Discover a joyful pre-school journey with faith, play and learning"
            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
          />
        </div>

        {/* Quote */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
            Quote:
          </label>

          <textarea
            value={quote}
            onChange={(e) => onChange?.("quote", e.target.value)}
            rows={3}
            placeholder='"For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God not by works, so that no one can boast". Ephesians 2:8-9(NIV)'
            className="w-full resize-none rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
            Upload Image:
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) => onChange?.("image", e.target.value)}
            placeholder="Upload Image Max 20mb"
            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] sm:text-xs font-semibold text-[#555555] transition hover:bg-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] sm:text-xs font-semibold text-white transition hover:bg-lime-green"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerModal;