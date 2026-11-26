const SkeletonBlock = ({ className = "", dark = false }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg ${dark ? "bg-white/10" : "bg-black/10"} ${className}`}
  />
);

// Shared page shell used by the route-level fallbacks so a lazy chunk load
// shows a page-shaped skeleton instead of a blank frame.
const LandingShellSkeleton = ({ children }) => (
  <div className="flex min-h-dvh w-full flex-col">
    <div className="flex h-16 w-full items-center gap-4 bg-[#0c2423] px-4 sm:h-20 sm:px-10">
      <SkeletonBlock dark className="h-9 w-9 rounded-full" />
      <SkeletonBlock dark className="h-4 w-40" />
      <SkeletonBlock dark className="ml-auto hidden h-4 w-24 sm:block" />
    </div>

    <div className="flex w-full flex-1 flex-col overflow-x-hidden">
      <div className="flex w-full flex-1 flex-col bg-egg px-3 pt-3 pb-10 sm:px-5 lg:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 sm:gap-10">
          {children}
        </div>
      </div>
    </div>

    <div className="h-64 w-full animate-pulse bg-[#062421]" />
  </div>
);

const BannerSkeleton = () => (
  <SkeletonBlock className="h-44 w-full rounded-xl sm:h-48 md:h-56" />
);

export const AdmissionPageSkeleton = () => (
  <LandingShellSkeleton>
    <BannerSkeleton />

    <div className="flex flex-col gap-3">
      <SkeletonBlock className="h-5 w-48" />
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <SkeletonBlock className="h-10 w-56 rounded-xl sm:w-64" />
        <SkeletonBlock className="h-10 w-40 rounded-xl sm:w-48" />
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <SkeletonBlock className="h-5 w-40" />
      <div className="flex flex-col gap-6 rounded-2xl border border-parent-accent/15 bg-bone px-4 py-6 sm:gap-8 sm:px-8">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="flex gap-3 sm:gap-5">
            <SkeletonBlock className="h-8 w-8 shrink-0 rounded-full sm:h-10 sm:w-10" />
            <div className="flex w-full flex-col gap-2">
              <SkeletonBlock className="h-4 w-48 sm:w-56" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </LandingShellSkeleton>
);

export const TuitionContentSkeleton = () => (
  <div className="flex w-full flex-col gap-y-5 sm:gap-y-6">
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-parent-accent/10 bg-bone p-2 sm:w-fit">
      {[0, 1, 2, 3].map((item) => (
        <SkeletonBlock key={item} className="h-8 w-20 rounded-xl sm:w-24" />
      ))}
    </div>

    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-2xl border border-parent-accent/15 bg-bone p-4 sm:p-5">
        <SkeletonBlock className="h-3 w-32" />
        <SkeletonBlock className="h-5 w-24" />
        <SkeletonBlock className="h-8 w-full" />
        {[0, 1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex justify-between border-b border-neutral-200 py-3"
          >
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-16" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((item) => (
          <SkeletonBlock
            key={item}
            className="min-h-55 w-full rounded-2xl sm:min-h-60"
          />
        ))}
      </div>
    </div>
  </div>
);

export const TuitionPageSkeleton = () => (
  <LandingShellSkeleton>
    <BannerSkeleton />
    <TuitionContentSkeleton />
  </LandingShellSkeleton>
);

export const TransportationContentSkeleton = () => (
  <div className="flex w-full flex-col gap-8">
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <SkeletonBlock key={item} className="h-20 w-full rounded-2xl sm:h-24" />
      ))}
    </div>

    <div className="flex flex-col gap-y-8">
      <SkeletonBlock className="h-6 w-56" />

      {[0, 1].map((zone) => (
        <div key={zone} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-5 w-8 rounded-full" />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {[0, 1, 2].map((item) => (
              <SkeletonBlock
                key={item}
                className="min-h-36 w-full rounded-2xl sm:min-h-44"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const TransportationPageSkeleton = () => (
  <LandingShellSkeleton>
    <BannerSkeleton />
    <TransportationContentSkeleton />
  </LandingShellSkeleton>
);
