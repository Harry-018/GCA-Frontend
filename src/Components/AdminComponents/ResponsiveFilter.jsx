import React from "react";
import { ChevronDown } from "lucide-react";

const ResponsiveFilter = ({
  options,
  value,
  onChange,
  label = "Filter",
  className = "",
  mobileClassName = "w-full",
}) => {
  return (
    <>
      <div className={`relative sm:hidden ${mobileClassName} ${className}`}>
        <select
          aria-label={label}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-9 w-full cursor-pointer appearance-none rounded-full border border-parent-accent/25 bg-bone pl-3 pr-9 font-[Poppins] text-xs text-gray-600 outline-none transition focus:border-parent-green"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      <div className={`hidden flex-wrap items-center gap-2 sm:flex ${className}`}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange?.(option.value)}
            className={`rounded-full px-4 py-2 font-[Poppins] text-xs transition ${
              value === option.value
                ? "bg-parent-green text-white"
                : "text-gray-500 hover:bg-parent-accent/15"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default ResponsiveFilter;
