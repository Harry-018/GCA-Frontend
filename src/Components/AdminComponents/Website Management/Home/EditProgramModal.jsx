import React from "react";
import { ChevronDown } from "lucide-react";

const EditProgramModal = ({
  isOpen,
  gradeLevel = "Nursery",
  minAge = "3",
  maxAge = "3",
  image = "",
  description = "",
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
          Edit Program
        </h2>

        {/* Grade Level & Image */}
        <div className="grid grid-cols-1 gap-3 pt-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              Grade Level:
            </label>

            <div className="relative">
              <select
                value={gradeLevel}
                onChange={(e) =>
                  onChange?.("gradeLevel", e.target.value)
                }
                className={selectStyle}
              >
                <option value="Nursery">Nursery</option>
                <option value="Pre-Kinder">Pre-Kinder</option>
                <option value="Kinder">Kinder</option>
              </select>

              <ChevronDown size={14} className={chevronClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              Image:
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) => onChange?.("image", e.target.value)}
              placeholder="Upload Image"
              className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
            />
          </div>
        </div>

        {/* Min Age & Max Age */}
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              Min. Age:
            </label>

            <div className="relative">
              <select
                value={minAge}
                onChange={(e) => onChange?.("minAge", e.target.value)}
                className={selectStyle}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <ChevronDown size={14} className={chevronClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              Max. Age:
            </label>

            <div className="relative">
              <select
                value={maxAge}
                onChange={(e) => onChange?.("maxAge", e.target.value)}
                className={selectStyle}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <ChevronDown size={14} className={chevronClass} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 pt-4">
          <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
            Description:
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              onChange?.("description", e.target.value)
            }
            rows={3}
            placeholder="Our preschool works closely with parents to ensure the maximum benefit from early schooling."
            className="w-full resize-none rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green"
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

export default EditProgramModal;