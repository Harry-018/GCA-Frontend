const SkeletonBlock = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg bg-parent-green/10 motion-reduce:animate-none ${className}`}
  />
);

const SkeletonLines = ({ count = 2, className = "" }) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    {Array.from({ length: count }, (_, index) => (
      <SkeletonBlock
        key={index}
        className={`h-3 ${index === count - 1 ? "w-2/3" : "w-full"}`}
      />
    ))}
  </div>
);

const SkeletonTable = ({ columns = 6, rows = 8 }) => {
  const minWidth =
    columns >= 8
      ? "min-w-[900px]"
      : columns >= 6
        ? "min-w-[720px]"
        : "min-w-[560px]";

  return (
    <div className="w-full overflow-auto rounded-2xl border border-parent-accent/15 bg-bone">
      <div className={`${minWidth} overflow-hidden`}>
        <div
          className="grid gap-4 border-b border-parent-accent/15 bg-parent-green/5 px-4 py-4"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }, (_, index) => (
            <SkeletonBlock key={index} className="h-3 w-4/5" />
          ))}
        </div>
        <div className="divide-y divide-parent-accent/10">
          {Array.from({ length: rows }, (_, row) => (
            <div
              key={row}
              className="grid gap-4 px-4 py-4"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: columns }, (_, column) => (
                <SkeletonBlock
                  key={column}
                  className={`h-3 ${column === 0 ? "w-4/5" : "w-3/5"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionTabs = () => (
  <div className="flex gap-3 overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone p-3 sm:p-4">
    {[0, 1, 2].map((item) => (
      <SkeletonBlock
        key={item}
        className="h-16 min-w-32 flex-1 rounded-xl sm:h-20"
      />
    ))}
  </div>
);

const PageHeading = () => (
  <div className="flex flex-col gap-3 border-b border-parent-accent/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div className="flex w-full flex-col gap-3 sm:max-w-sm">
      <SkeletonBlock className="h-3 w-28" />
      <SkeletonBlock className="h-7 w-56 max-w-full sm:h-8" />
    </div>
    <SkeletonBlock className="h-4 w-full max-w-xs" />
  </div>
);

const StudentProfile = () => (
  <div className="rounded-3xl border border-parent-accent/15 bg-bone p-5 shadow-sm sm:p-7">
    <div className="flex items-center gap-4">
      <SkeletonBlock className="size-14 shrink-0 rounded-full sm:size-16" />
      <div className="flex flex-1 flex-col gap-3">
        <SkeletonBlock className="h-3 w-28" />
        <SkeletonBlock className="h-5 w-56 max-w-full" />
      </div>
    </div>
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-parent-accent/10 bg-white/70 p-4"
        >
          <SkeletonBlock className="mb-3 h-3 w-24" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap gap-3">
      <SkeletonBlock className="h-4 w-40" />
      <SkeletonBlock className="h-4 w-40" />
    </div>
  </div>
);

const SettingsCards = () => (
  <>
    <div className="rounded-2xl border border-parent-accent/15 bg-bone p-5 sm:p-7">
      <SkeletonBlock className="mb-5 h-4 w-44" />
      <div className="grid gap-4 sm:grid-cols-2">
        <SkeletonLines />
        <SkeletonLines />
      </div>
    </div>
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr] lg:gap-6">
      {[0, 1].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-parent-accent/15 bg-bone p-5 sm:p-7"
        >
          <SkeletonBlock className="mb-5 h-4 w-40" />
          <SkeletonLines count={3} />
          <SkeletonBlock className="mt-6 h-10 w-36 rounded-full" />
        </div>
      ))}
    </div>
  </>
);

const ToolbarSkeleton = () => (
  <div className="flex flex-col gap-3 rounded-2xl border border-parent-accent/15 bg-bone p-4 sm:flex-row sm:items-center">
    <SkeletonBlock className="h-10 w-full rounded-full sm:max-w-64" />
    <SkeletonBlock className="h-10 w-full rounded-xl sm:w-44" />
    <div className="flex gap-2 sm:ml-auto">
      <SkeletonBlock className="h-10 w-24 rounded-full" />
      <SkeletonBlock className="h-10 w-24 rounded-full" />
    </div>
  </div>
);

const TeacherWelcome = () => (
  <div className="flex flex-col gap-4 rounded-2xl border border-[#dce9df] bg-linear-to-r from-[#edf5ef] via-[#f5f7f0] to-[#f8f3e9] px-4 py-4 xs:px-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
    <div className="flex items-center gap-3">
      <SkeletonBlock className="size-11 rounded-xl bg-parent-green/15" />
      <div className="flex flex-col gap-3">
        <SkeletonBlock className="h-3 w-32" />
        <SkeletonBlock className="h-5 w-48" />
      </div>
    </div>
    <SkeletonBlock className="h-16 w-full rounded-xl sm:w-48" />
  </div>
);

const CalendarSkeleton = () => (
  <div className="w-full overflow-hidden rounded-xl border border-[#dcded8]">
    <div className="grid grid-cols-5 bg-parent-green">
      {[0, 1, 2, 3, 4].map((item) => (
        <div key={item} className="px-2 py-3">
          <SkeletonBlock className="mx-auto h-3 w-12 bg-white/20" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-5">
      {[0, 1, 2, 3, 4].map((day) => (
        <div key={day} className="min-h-72 border-r border-[#dcded8] p-2">
          {[0, 1, 2, 3].map((event) => (
            <SkeletonBlock
              key={event}
              className={`mb-3 h-12 rounded-md ${event % 2 ? "mt-10" : ""}`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const PortalPageSkeleton = ({ variant }) => {
  let content;
  let pageClass =
    "mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-5 font-[Poppins] sm:px-5 sm:py-6";

  switch (variant) {
    case "parent-dashboard":
      pageClass += " min-h-screen";
      content = (
        <>
          <StudentProfile />
          <SkeletonBlock className="h-5 w-56" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="min-h-48 rounded-2xl border border-parent-accent/15 bg-bone p-5"
              >
                <SkeletonBlock className="mb-5 h-4 w-2/3" />
                <SkeletonLines count={4} />
              </div>
            ))}
          </div>
        </>
      );
      break;
    case "parent-grades":
      pageClass += " min-h-screen";
      content = (
        <>
          <StudentProfile />
          <div className="flex items-center justify-between">
            <SkeletonBlock className="h-5 w-24" />
            <SkeletonBlock className="h-10 w-36 rounded-full" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-parent-accent/15 bg-bone p-5"
              >
                <SkeletonBlock className="mb-5 h-4 w-36" />
                <SkeletonLines count={4} />
              </div>
            ))}
          </div>
          <SkeletonTable columns={4} rows={5} />
        </>
      );
      break;
    case "parent-security":
    case "teacher-security":
      pageClass += " min-h-full lg:px-10 lg:pt-5 lg:pb-10";
      content = (
        <>
          <PageHeading />
          <SettingsCards />
        </>
      );
      break;
    case "teacher-dashboard":
      pageClass += " min-h-0 flex-1";
      content = (
        <>
          <TeacherWelcome />
          <SectionTabs />
          <SkeletonTable columns={8} rows={8} />
        </>
      );
      break;
    case "teacher-attendance":
    case "teacher-grades":
      pageClass += " min-h-0 flex-1";
      content = (
        <>
          <SectionTabs />
          <ToolbarSkeleton />
          <SkeletonTable columns={6} rows={8} />
        </>
      );
      break;
    case "teacher-report":
      pageClass += " min-h-0 flex-1";
      content = (
        <>
          <SectionTabs />
          <ToolbarSkeleton />
          <SkeletonTable columns={8} rows={8} />
        </>
      );
      break;
    case "teacher-schedule":
      pageClass =
        "relative mx-auto mt-4 flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone p-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:mt-6 sm:w-3/4 sm:p-5 md:p-6";
      content = (
        <>
          <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />
          <div className="mb-4 w-full sm:mb-5">
            <SkeletonBlock className="h-5 w-48" />
            <SkeletonBlock className="mt-3 h-3 w-64 max-w-full" />
          </div>
          <CalendarSkeleton />
        </>
      );
      break;
    case "announcement-list":
      pageClass =
        "grid w-full grid-cols-1 gap-4 py-1 sm:grid-cols-2 lg:gap-5";
      content = [0, 1].map((item) => (
        <div
          key={item}
          className="min-h-48 rounded-2xl border border-parent-accent/15 bg-bone p-5 shadow-sm"
        >
          <SkeletonBlock className="mb-4 h-4 w-2/3" />
          <SkeletonBlock className="mb-5 h-3 w-32" />
          <SkeletonLines count={4} />
        </div>
      ));
      break;
    case "table":
      pageClass = "w-full min-w-0";
      content = <SkeletonTable columns={8} rows={8} />;
      break;
    default:
      throw new Error(`Unknown portal skeleton variant: ${variant}`);
  }

  return (
    <div
      role="status"
      aria-label="Loading page content"
      aria-busy="true"
      className={pageClass}
    >
      {content}
    </div>
  );
};

export default PortalPageSkeleton;
