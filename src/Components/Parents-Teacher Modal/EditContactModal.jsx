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
        <h2 className="text-sm font-[PoppinsBold] text-swamp-green">
          Edit Contact Information
        </h2>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="teacher-contact-number"
              className="text-[11px] lg:text-xs xl:text-sm text-gray-600"
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
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-[11px] lg:text-xs xl:text-sm text-gray-700 outline-none focus:border-swamp-green disabled:opacity-60"
              placeholder="Enter contact number"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="teacher-contact-email"
              className="text-[11px] lg:text-xs xl:text-sm text-gray-600"
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
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-[11px] lg:text-xs xl:text-sm text-gray-700 outline-none focus:border-swamp-green disabled:opacity-60"
              placeholder="Enter email"
            />
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
            className="rounded-full border border-gray-400 px-5 py-1.5 text-2xs font-[PoppinsBold] text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            CANCEL
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-swamp-green px-6 py-1.5 text-2xs font-[PoppinsBold] text-white transition hover:bg-swamp-green/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "SAVING..." : "SAVE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContactModal;
