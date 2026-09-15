import React from "react";

const EditContactModal = ({
  contactNo,
  email,
  address,
  onContactNoChange,
  onEmailChange,
  onAddressChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#F5F6FF] px-5 py-4 shadow-lg">
        <h2 className="text-sm font-semibold text-[#8FA86E]">
          Edit Contact Information
        </h2>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-gray-600">
              Contact No.
            </label>

            <input
              type="text"
              value={contactNo}
              onChange={(e) => onContactNoChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-[11px] text-gray-600 outline-none focus:border-[#8FA86E]"
              placeholder="Enter contact number"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-gray-600">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-[11px] text-gray-600 outline-none focus:border-[#8FA86E]"
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-gray-600">
              Address
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-[11px] text-gray-600 outline-none focus:border-[#8FA86E]"
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 py-1">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-400 px-5 py-1.5 text-2xs font-semibold text-gray-500 transition hover:bg-gray-100"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-full bg-[#8FA86E] px-6 py-1.5 text-2xs font-semibold text-white transition hover:bg-[#7D9660]"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;