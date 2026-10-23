import React from "react";

const EditGradeLevelModal = ({
  isOpen,
  name = "",
  tuition_fee = "",
  books = "",
  uniform_boys = "",
  pe_uniform_boys = "",
  uniform_girls = "",
  pe_uniform_girls = "",
  error = "",
  saving = false,
  onChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const inputStyle =
    "w-full rounded-lg border border-[#cfcfcf] bg-bone px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green disabled:cursor-not-allowed disabled:bg-gray-100";

  const labelStyle = "font-[Poppins] text-[9px] sm:text-2xs text-[#555555]";

  const feeFields = [
    { label: "Tuition Fee", key: "tuition_fee", value: tuition_fee },
    { label: "Books", key: "books", value: books },
    { label: "Uniform (Boys)", key: "uniform_boys", value: uniform_boys },
    {
      label: "P.E. Uniform (Boys)",
      key: "pe_uniform_boys",
      value: pe_uniform_boys,
    },
    { label: "Uniform (Girls)", key: "uniform_girls", value: uniform_girls },
    {
      label: "P.E. Uniform (Girls)",
      key: "pe_uniform_girls",
      value: pe_uniform_girls,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dddddd] bg-[#f4f5fc] p-5 shadow-lg">
        <h2 className="font-[Poppins] text-[9px] font-semibold text-swamp-green sm:text-sm">
          Edit Grade Level
        </h2>

        {/* Grade Level Name */}
        <div className="flex flex-col gap-1.5 pt-5">
          <label className={labelStyle}>Grade Level:</label>

          <input
            type="text"
            value={name}
            readOnly
            disabled
            className={inputStyle}
          />
        </div>

        {/* Fees */}
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
          {feeFields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className={labelStyle}>{field.label}:</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={field.value}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                placeholder="0.00"
                className={inputStyle}
                disabled={saving}
              />
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="pt-3 font-[Poppins] text-xs text-red-600">{error}</p>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-full border border-[#bcbcbc] px-5 py-2 font-[Poppins] text-[9px] font-semibold text-[#555555] transition hover:bg-bone disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-[9px] font-semibold text-white transition hover:bg-lime-green disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGradeLevelModal;
