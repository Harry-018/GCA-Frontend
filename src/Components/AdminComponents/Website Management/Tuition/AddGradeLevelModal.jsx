import React from "react";

const AddGradeLevelModal = ({
  isOpen,
  name = "",
  tuition = "",
  books = "",
  boysUniform = "",
  boysPE = "",
  girlsUniform = "",
  girlsPE = "",
  onChange,
  onClose,
  onAdd,
}) => {
  if (!isOpen) return null;

  const inputStyle =
    "w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green";

  const labelStyle = "font-[Poppins] text-[9px] sm:text-2xs text-[#555555]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] sm:text-sm font-semibold text-swamp-green">
          Add Grade Level
        </h2>

        {/* Grade Level Name */}
        <div className="flex flex-col gap-1.5 pt-5">
          <label className={labelStyle}>
            Grade Level:
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => onChange?.("name", e.target.value)}
            placeholder="Nursery"
            className={inputStyle}
          />
        </div>

        {/* Fees */}
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Tuition Fee:
            </label>

            <input
              type="text"
              value={tuition}
              onChange={(e) => onChange?.("tuition", e.target.value)}
              placeholder="₱12,000"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Books:
            </label>

            <input
              type="text"
              value={books}
              onChange={(e) => onChange?.("books", e.target.value)}
              placeholder="₱4,000"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Uniform (Boys):
            </label>

            <input
              type="text"
              value={boysUniform}
              onChange={(e) => onChange?.("boysUniform", e.target.value)}
              placeholder="₱1,000"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              P.E. Uniform (Boys):
            </label>

            <input
              type="text"
              value={boysPE}
              onChange={(e) => onChange?.("boysPE", e.target.value)}
              placeholder="₱1,200"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Uniform (Girls):
            </label>

            <input
              type="text"
              value={girlsUniform}
              onChange={(e) => onChange?.("girlsUniform", e.target.value)}
              placeholder="₱800"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              P.E. Uniform (Girls):
            </label>

            <input
              type="text"
              value={girlsPE}
              onChange={(e) => onChange?.("girlsPE", e.target.value)}
              placeholder="₱1,000"
              className={inputStyle}
            />
          </div>
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
            onClick={onAdd}
            className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] sm:text-xs font-semibold text-white transition hover:bg-lime-green"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGradeLevelModal;