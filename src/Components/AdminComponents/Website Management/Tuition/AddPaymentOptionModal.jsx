import React from "react";

const AddPaymentOptionModal = ({
  isOpen,
  name = "",
  dueDate = "",
  discount = "",
  installment = "",
  total = "",
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
          Add Payment Option
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-1.5 pt-5">
          <label className={labelStyle}>
            Name:
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => onChange?.("name", e.target.value)}
            placeholder="Full Cash"
            className={inputStyle}
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Due Date:
            </label>

            <input
              type="text"
              value={dueDate}
              onChange={(e) => onChange?.("dueDate", e.target.value)}
              placeholder="Every 10th of the month"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Discount:
            </label>

            <input
              type="text"
              value={discount}
              onChange={(e) => onChange?.("discount", e.target.value)}
              placeholder="₱1,500"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Monthly Installment:
            </label>

            <input
              type="text"
              value={installment}
              onChange={(e) => onChange?.("installment", e.target.value)}
              placeholder="₱1,100.00"
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelStyle}>
              Total:
            </label>

            <input
              type="text"
              value={total}
              onChange={(e) => onChange?.("total", e.target.value)}
              placeholder="₱16,700 - ₱16,800"
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

export default AddPaymentOptionModal;