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
  saving = false,
  error = "",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!saving) onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/20 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="my-auto w-full max-w-md rounded-2xl bg-[#F5F6FF] px-5 py-4 shadow-lg"
      >
        <h2 className="text-sm font-semibold text-[#8FA86E]">
          Edit Contact Information
        </h2>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="teacher-contact-number"
              className="text-[11px] text-gray-600"
            >
              Contact No.
            </label>

            <input
              id="teacher-contact-number"
              type="tel"
              autoComplete="tel"
              value={contactNo}
              onChange={(e) => onContactNoChange(e.target.value)}
              disabled={saving}
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-[11px] text-gray-700 outline-none focus:border-[#8FA86E] disabled:opacity-60"
              placeholder="Enter contact number"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="teacher-contact-email"
              className="text-[11px] text-gray-600"
            >
              Email
            </label>

            <input
              id="teacher-contact-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              disabled={saving}
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-[11px] text-gray-700 outline-none focus:border-[#8FA86E] disabled:opacity-60"
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="teacher-contact-address"
              className="text-[11px] text-gray-600"
            >
              Address
            </label>

            <input
              id="teacher-contact-address"
              type="text"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-[11px] text-gray-500 outline-none disabled:cursor-not-allowed"
              placeholder="Address"
            />

            <p className="text-[10px] text-gray-500">
              Address editing is not available here.
            </p>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap justify-end gap-2 py-1">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-full border border-gray-400 px-5 py-1.5 text-2xs font-semibold text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            CANCEL
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#8FA86E] px-6 py-1.5 text-2xs font-semibold text-white transition hover:bg-[#7D9660] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "SAVING..." : "SAVE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContactModal;
