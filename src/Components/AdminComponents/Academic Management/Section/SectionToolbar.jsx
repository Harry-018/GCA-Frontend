import React from "react";

const SectionToolbar = ({
  pageTitle,
  schoolYears = [],
  selectedSchoolYearId = "",
  onSchoolYearChange,
  loading = false,
}) => {
  const getYearLabel = (year) => {
    const startYear = year.start_date
      ? new Date(year.start_date).getUTCFullYear()
      : null;

    const endYear = year.end_date
      ? new Date(year.end_date).getUTCFullYear()
      : null;

    if (startYear && endYear) {
      return `${startYear} - ${endYear}`;
    }

    return "School year unavailable";
  };

  const selectedYear = schoolYears.find(
    (year) => String(year.school_year_id) === String(selectedSchoolYearId),
  );

  return (
    <div className="flex min-h-11 max-w-full flex-wrap items-center gap-2 px-4 py-1">
      <h2 className="text-md font-[PoppinsBold] text-swamp-green">
        {pageTitle}
      </h2>

      <select
        aria-label="Select school year"
        value={selectedSchoolYearId}
        onChange={(event) => onSchoolYearChange?.(event.target.value)}
        disabled={loading || schoolYears.length === 0}
        className="h-8 max-w-44 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white py-1 pl-2.5 pr-7 text-[10px] text-gray-600 outline-none transition hover:border-swamp-green focus:border-swamp-green disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
      >
        {loading && <option value="">Loading...</option>}

        {!loading && schoolYears.length === 0 && (
          <option value="">No school years available</option>
        )}

        {schoolYears.map((year) => (
          <option key={year.school_year_id} value={String(year.school_year_id)}>
            {getYearLabel(year)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SectionToolbar;
