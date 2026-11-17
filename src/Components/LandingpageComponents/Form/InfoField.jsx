import { ChevronDown } from "lucide-react";

const normalizeContactNumber = (rawValue) => {
  let digits = String(rawValue || "").replace(/\D/g, "");

  if (digits.startsWith("63")) {
    digits = `0${digits.slice(2)}`;
  }

  digits = digits.slice(0, 11);

  if (!digits) return "";

  if (!digits.startsWith("09")) {
    if (digits.startsWith("9")) {
      digits = `0${digits}`;
    } else if (digits.startsWith("0")) {
      digits = `09${digits.slice(1)}`;
    } else {
      digits = `09${digits}`;
    }
  }

  return digits.slice(0, 11);
};

const InfoField = ({
  label,
  value,
  optional = false,
  required = false,
  type = "text",
  options,
  readOnly = false,
  disabled = false,
  onChange,
  className = "",
  name,
  max,
  min,
  placeholder,
  inputMode,
  autoComplete = "off",
  error = "",
}) => {
  const handleInputChange = (e) => {
    let nextValue = e.target.value;

    if (name === "contact_number") {
      nextValue = normalizeContactNumber(nextValue);
    } else if (type === "text" && label !== "Email") {
      nextValue = nextValue.toUpperCase();
    }

    onChange?.({
      ...e,
      target: {
        ...e.target,
        value: nextValue,
      },
    });
  };

  const handleFocus = (e) => {
    if (name === "contact_number" && !value) {
      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: "09",
        },
      });
    }
  };

  return (
    <label className={`flex min-w-0 flex-col gap-1 ${className}`}>
      <span className="flex items-center justify-between text-xs text-neutral-600">
        <span>
          {label}
          {required && <b className="text-red-400"> *</b>}
        </span>

        {optional && <span className="text-2xs">(Optional)</span>}
      </span>

      {options ? (
        <div className="relative">
          <select
            value={value ?? ""}
            onChange={(e) => onChange?.(e)}
            disabled={readOnly || disabled}
            className="h-10 w-full appearance-none rounded-md border border-[#d4d5d9] bg-bone px-3 pr-9 text-sm text-neutral-700 outline-none focus:border-parent-green focus:ring-1 focus:ring-parent-accent disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500"
          >
            <option value="" disabled>
              Select {label}
            </option>

            {options.map((option) => {
              const optionValue =
                typeof option === "object" ? option.value : option;

              const optionLabel =
                typeof option === "object" ? option.label : option;

              return (
                <option key={optionValue} value={optionValue}>
                  {optionLabel.toUpperCase()}
                </option>
              );
            })}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
        </div>
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={handleInputChange}
          onFocus={handleFocus}
          readOnly={readOnly}
          disabled={disabled}
          max={max}
          min={min}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className="h-10 w-full rounded-md border border-[#d4d5d9] bg-bone px-3 text-sm text-neutral-700 outline-none focus:border-parent-green focus:ring-1 focus:ring-parent-accent read-only:cursor-not-allowed read-only:bg-neutral-100 read-only:text-neutral-500"
        />
      )}

      {error && <span className="text-2xs text-red-500">{error}</span>}
    </label>
  );
};

export default InfoField;
