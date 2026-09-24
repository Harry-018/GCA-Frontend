import { ChevronDown } from "lucide-react";

const InfoField = ({
  label,
  value,
  optional = false,
  required = false,
  type = "text",
  options,
  readOnly = false,
  onChange,
  className = "",
  name,
}) => {
  const handleInputChange = (e) => {
    let value = e.target.value;

    if (name === "contact_number") {
      // Allow digits only
      value = value.replace(/\D/g, "");

      // Maximum of 11 digits
      value = value.slice(0, 11);
    } else if (type === "text" && label !== "Email") {
      value = value.toUpperCase();
    }

    onChange?.({
      ...e,
      target: {
        ...e.target,
        value,
      },
    });
  };

  return (
    <label className={`flex min-w-0 flex-col gap-1 ${className}`}>
      <span className="flex items-center justify-between text-xs font-medium text-neutral-600">
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
            disabled={readOnly}
            className="h-10 w-full appearance-none rounded-md border border-[#d4d5d9] bg-white px-3 pr-9 text-sm text-neutral-700 outline-none focus:border-swamp-green focus:ring-1 focus:ring-lime-dark disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500"
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
          readOnly={readOnly}
          className="h-10 w-full rounded-md border border-[#d4d5d9] bg-white px-3 text-sm text-neutral-700  outline-none focus:border-swamp-green focus:ring-1 focus:ring-lime-dark read-only:cursor-not-allowed read-only:bg-neutral-100 read-only:text-neutral-500"
        />
      )}
    </label>
  );
};

export default InfoField;
