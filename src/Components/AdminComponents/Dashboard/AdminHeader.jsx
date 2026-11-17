import ParentInquiryNotifications from "./ParentInquiryNotifications";

const AdminHeader = ({
  schoolYears = [],
  selectedSchoolYearId = "",
  onSchoolYearChange,
  loading = false,
}) => {
  return (
    <header className="flex min-h-16 w-full flex-nowrap items-center justify-between gap-x-3 rounded-2xl border border-parent-accent/20 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:min-h-18 sm:gap-x-7 sm:px-4 sm:py-5">
      <div className="flex min-w-0 flex-nowrap items-center gap-x-2 sm:gap-x-5">
        <h1 className="shrink-0 whitespace-nowrap text-sm font-[Poppins] text-gray-700 sm:text-base">
          Dashboard
        </h1>
        <select
          id="dashboard-school-year"
          aria-label="School year"
          value={selectedSchoolYearId}
          onChange={onSchoolYearChange}
          disabled={loading || schoolYears.length === 0}
          className="h-8 min-w-0 max-w-36 cursor-pointer appearance-none rounded-full border border-parent-accent/25 bg-bone py-1 pl-2.5 pr-7 text-2xs text-egg-dark outline-none transition hover:border-parent-accent focus:border-parent-green disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-48 sm:text-xs"
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
                SY. {startYear}–{endYear}
              </option>
            );
          })}
        </select>
      </div>

      <ParentInquiryNotifications />
    </header>
  );
};

export default AdminHeader;
