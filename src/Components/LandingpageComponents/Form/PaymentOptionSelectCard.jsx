import { Check } from "lucide-react";

const formatCurrency = (amount) =>
  `₱${Number(amount || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getInclusions = (option, gender) => {
  const isFemale = String(gender || "").toUpperCase() === "FEMALE";

  const uniformKey = isFemale ? "uniform_girls" : "uniform_boys";
  const peUniformKey = isFemale ? "pe_uniform_girls" : "pe_uniform_boys";

  return [
    { label: "Tuition Fee", value: Number(option.tuition_fee || 0) },
    { label: "Books", value: Number(option.books || 0) },
    { label: "School Clothes / Uniform", value: Number(option[uniformKey] || 0) },
    { label: "P.E. Uniform", value: Number(option[peUniformKey] || 0) },
  ].filter((item) => item.value > 0);
};

const getTotal = (option, gender) => {
  const isFemale = String(gender || "").toUpperCase() === "FEMALE";

  const subtotal =
    Number(option.tuition_fee || 0) +
    Number(option.books || 0) +
    Number(
      option[isFemale ? "uniform_girls" : "uniform_boys"] || 0,
    ) +
    Number(
      option[isFemale ? "pe_uniform_girls" : "pe_uniform_boys"] || 0,
    );

  return Math.max(0, subtotal - Number(option.discount || 0));
};

const PaymentOptionSelectCard = ({
  option,
  gender,
  selected = false,
  onSelect,
}) => {
  const inclusions = getInclusions(option, gender);
  const total = getTotal(option, gender);
  const discount = Number(option.discount || 0);
  const installment = Number(option.installment || 0);
  const dueDate = option.due_date_display || option.due_date || "";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full flex-col rounded-xl border p-3 text-left font-[Poppins] transition sm:p-4 ${
        selected
          ? "border-parent-green bg-parent-pale/40 shadow-[0_2px_8px_rgba(47,107,69,0.18)] ring-1 ring-parent-green/30"
          : "border-[#d4d5d9] bg-bone shadow-sm hover:border-parent-accent/60 hover:shadow"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="min-w-0 wrap-break-word text-xs font-[PoppinsBold] uppercase text-parent-green sm:text-sm">
          {option.option_name}
        </h4>

        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
            selected
              ? "border-parent-green bg-parent-green text-white"
              : "border-[#bfc4ca] bg-white text-transparent"
          }`}
          aria-hidden="true"
        >
          <Check size={12} strokeWidth={3} />
        </span>
      </div>

      <div className="mt-2">
        <p className="text-2xs uppercase tracking-wide text-neutral-500">
          Total
        </p>

        <p className="text-base font-[PoppinsBold] text-parent-green sm:text-lg">
          {formatCurrency(total)}
        </p>

        {discount > 0 && (
          <p className="text-2xs text-neutral-500">
            Discount:{" "}
            <span className="font-[PoppinsBold] text-parent-accent">
              {formatCurrency(discount)}
            </span>
          </p>
        )}
      </div>

      <div className="mt-2 border-t border-parent-accent/15 pt-2">
        <p className="mb-1 text-2xs uppercase tracking-wide text-neutral-500">
          Inclusions
        </p>

        {inclusions.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {inclusions.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-2 text-2xs text-neutral-600"
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <Check
                    size={10}
                    strokeWidth={3}
                    className="shrink-0 text-parent-green"
                  />
                  <span className="wrap-break-word">{item.label}</span>
                </span>

                <span className="shrink-0 font-[PoppinsBold] text-neutral-500">
                  {formatCurrency(item.value)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-2xs text-neutral-500">
            Inclusions will follow the school fee structure.
          </p>
        )}
      </div>

      {(installment > 0 || dueDate) && (
        <div className="mt-2 border-t border-parent-accent/15 pt-2">
          {installment > 0 && (
            <p className="text-2xs text-neutral-500">
              Installment:{" "}
              <span className="font-[PoppinsBold] text-parent-green">
                {formatCurrency(installment)} / month
              </span>
            </p>
          )}

          {dueDate && (
            <p className="text-2xs text-neutral-500">
              Due date:{" "}
              <span className="font-[PoppinsBold] text-neutral-600">
                {dueDate}
              </span>
            </p>
          )}
        </div>
      )}
    </button>
  );
};

export default PaymentOptionSelectCard;
