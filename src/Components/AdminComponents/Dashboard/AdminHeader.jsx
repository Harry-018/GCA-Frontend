const AdminHeader = ({
  schoolYears = [],
  selectedSchoolYearId = "",
  onSchoolYearChange,
  loading = false,
}) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-2xl border border-gray-200 bg-bone px-3 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:px-4 sm:py-4.5">
      <h1 className="text-sm font-[Poppins] text-gray-700 sm:text-base xl:text-lg">
        Dashboard
      </h1>

      <div className="flex items-center gap-2">
        <label
          htmlFor="dashboard-school-year"
          className="whitespace-nowrap font-[Poppins] text-[11px] text-gray-600 sm:text-sm xl:text-base"
        >
          S.Y.
        </label>

        <select
          id="dashboard-school-year"
          value={selectedSchoolYearId}
          onChange={onSchoolYearChange}
          disabled={loading || schoolYears.length === 0}
          className="max-w-47.5 rounded-full border border-gray-300 bg-bone  font-[Poppins] text-[11px] text-egg-dark outline-none transition focus:border-swamp-green  sm:text-sm xl:text-base disabled:cursor-not-allowed disabled:opacity-60 "
        >
          {schoolYears.length === 0 && (
            <option value="">No school years</option>
          )}

          {schoolYears.map((year) => {
            const startYear = new Date(year.start_date).getFullYear();
            const endYear = new Date(year.end_date).getFullYear();

            return (
              <option
                key={year.school_year_id}
                value={String(year.school_year_id)}
              >
                {startYear} - {endYear}
              </option>
            );
          })}
        </select>
      </div>
    </header>
  );
};

export default AdminHeader;
