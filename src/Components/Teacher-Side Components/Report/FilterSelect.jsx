import React from "react";
import { ChevronDown } from "lucide-react";

const FilterSelect = ({ value, options, onChange, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block h-7 w-full appearance-none rounded-xl border border-gray-300 bg-white px-2 py-0 text-[9px] leading-7 text-gray-600 outline-none transition-colors focus:border-swamp-green sm:h-8 sm:px-3 sm:text-xs sm:leading-8"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 sm:right-3"
        size={12}
      />
    </div>
  );
};

export default FilterSelect;
