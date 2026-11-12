import React from "react";

const EditContactModal = ({
  isOpen,
  contact,
  onChange,
  onClose,
  onSave,
  saving,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-parent-accent/20 bg-linear-to-br from-bone via-white to-parent-pale/60 p-5 shadow-lg">
        <h2 className=" text-[9px] sm:text-sm md:text-base font-[PoppinsBold] text-parent-green">
          Edit Contact Information
        </h2>

        <div className="flex flex-col gap-3 pt-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              Contact No:
            </label>

            <input
              type="text"
              value={contact.contactNo}
              onChange={(e) => onChange?.("contactNo", e.target.value)}
              placeholder="Enter contact number"
              className="w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-parent-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              Email Address:
            </label>

            <input
              type="email"
              value={contact.emailAddress}
              onChange={(e) => onChange?.("emailAddress", e.target.value)}
              placeholder="Enter email address"
              className="w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-parent-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[Poppins] text-[9px] sm:text-2xs text-[#555555]">
              School Address:
            </label>

            <input
              type="text"
              value={contact.schoolAddress}
              onChange={(e) => onChange?.("schoolAddress", e.target.value)}
              placeholder="Enter school address"
              className="w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-2 font-[Poppins] text-[9px] sm:text-2xs text-[#555555] outline-none placeholder:text-[#999999] focus:border-parent-accent"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-parent-accent/30 px-5 py-2 text-[9px] sm:text-xs font-[PoppinsBold] text-[#555555] transition hover:bg-bone"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-parent-green px-5 py-2 text-[9px] font-[PoppinsBold] text-white transition hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
