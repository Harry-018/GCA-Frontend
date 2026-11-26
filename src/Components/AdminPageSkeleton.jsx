const SkeletonBlock = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg bg-parent-green/10 motion-reduce:animate-none ${className}`}
  />
);

const CardGrid = ({ count = 4 }) => (
  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className="min-h-36 rounded-2xl border border-parent-accent/20 bg-bone p-4 shadow-[0_2px_4px_rgba(0,0,0,0.12)] sm:p-5"
      >
        <SkeletonBlock className="mb-5 h-4 w-2/3" />
        <SkeletonBlock className="mb-3 h-3 w-1/2" />
        <SkeletonBlock className="h-3 w-3/4" />
      </div>
    ))}
  </div>
);

const AdminPageSkeleton = ({
  variant = "card-grid",
  count = 4,
  className = "",
}) => {
  let content;

  switch (variant) {
    case "card-grid":
      content = <CardGrid count={count} />;
      break;
    case "year-cards":
      content = (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: count }, (_, index) => (
            <div
              key={index}
              className="flex min-h-32 flex-col gap-4 rounded-2xl border border-parent-accent/20 bg-bone p-5 shadow-sm"
            >
              <SkeletonBlock className="h-4 w-2/3" />
              <SkeletonBlock className="mt-auto h-8 w-14" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      );
      break;
    case "announcement-cards":
      content = (
        <div className="grid min-h-0 w-full grid-cols-1 content-start gap-4 sm:grid-cols-2">
          {Array.from({ length: count }, (_, index) => (
            <div
              key={index}
              className="min-h-52 rounded-2xl border border-parent-accent/20 bg-bone p-5 shadow-sm"
            >
              <SkeletonBlock className="mb-4 h-4 w-3/4" />
              <SkeletonBlock className="mb-5 h-3 w-32" />
              {[0, 1, 2, 3].map((line) => (
                <SkeletonBlock
                  key={line}
                  className={`mb-3 h-3 ${line === 3 ? "w-2/3" : "w-full"}`}
                />
              ))}
            </div>
          ))}
        </div>
      );
      break;
    case "transportation":
      content = (
        <div className="w-full">
          <SkeletonBlock className="mb-4 h-5 w-40" />
          <CardGrid count={3} />
        </div>
      );
      break;
    case "settings":
      content = (
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          {[0, 1].map((panel) => (
            <div
              key={panel}
              className="rounded-2xl border border-parent-accent/20 bg-bone p-5 shadow-sm sm:p-7"
            >
              <SkeletonBlock className="mb-6 h-5 w-48" />
              {[0, 1, 2, 3].map((line) => (
                <div
                  key={line}
                  className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"
                >
                  <SkeletonBlock className="h-3 w-28 shrink-0" />
                  <SkeletonBlock className="h-9 w-full" />
                </div>
              ))}
              <SkeletonBlock className="mt-4 h-10 w-32 rounded-full" />
            </div>
          ))}
        </div>
      );
      break;
    case "student-info-modal":
      content = (
        <div className="max-h-[calc(100dvh-2.5rem)] w-full max-w-5xl overflow-y-auto rounded-2xl border border-parent-accent/25 bg-bone p-5 shadow-lg">
          <SkeletonBlock className="mb-5 h-4 w-40" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 py-5 md:grid-cols-3">
            {[0, 1, 2].map((column) => (
              <div key={column} className="flex flex-col gap-3">
                {Array.from({ length: column === 2 ? 5 : 7 }, (_, row) => (
                  <SkeletonBlock
                    key={row}
                    className="h-5 w-full"
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <SkeletonBlock className="h-8 flex-1 rounded-full" />
            <SkeletonBlock className="h-8 flex-1 rounded-full" />
          </div>
        </div>
      );
      break;
    case "tuition":
      content = (
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SkeletonBlock className="h-5 w-48" />
            <SkeletonBlock className="h-9 w-36 rounded-full" />
          </div>
          <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
            {[0, 1].map((panel) => (
              <div
                key={panel}
                className="min-h-80 rounded-2xl border border-parent-accent/20 bg-bone p-5 shadow-sm"
              >
                <SkeletonBlock className="mb-6 h-5 w-40" />
                {[0, 1, 2, 3, 4].map((line) => (
                  <SkeletonBlock
                    key={line}
                    className="mb-4 h-8 w-full rounded-md"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      );
      break;
    default:
      throw new Error(`Unknown admin skeleton variant: ${variant}`);
  }

  return (
    <div
      role="status"
      aria-label="Loading page content"
      aria-busy="true"
      className={`w-full ${className}`}
    >
      {content}
    </div>
  );
};

export default AdminPageSkeleton;
