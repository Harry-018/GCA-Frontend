const AdminHeader = ({
  schoolYears = [],
  selectedSchoolYearId = "",
  onSchoolYearChange,
  loading = false,
}) => {
  return (
    <header className="flex w-full min-h-16 flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-2xl border border-parent-accent/20 bg-bone px-3 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:min-h-18 sm:px-4 sm:py-4.5">
      <h1 className="text-sm font-[Poppins] text-gray-700 sm:text-base">
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
          className="h-8 max-w-44 cursor-pointer appearance-none rounded-full border border-parent-accent/25 bg-bone py-1 pl-2.5 pr-7 text-2xs text-egg-dark outline-none transition hover:border-parent-accent focus:border-parent-green disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
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
