const SkeletonBlock = ({ className = "", dark = false }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg ${dark ? "bg-white/10" : "bg-black/10"} ${className}`}
  />
);

/** Generic fallback shown while a lazy route/component chunk is downloading. */
const PageSkeleton = () => (
  <div className="flex min-h-dvh w-full flex-col bg-egg">
    <div className="flex h-16 w-full items-center gap-4 bg-[#0c2423] px-4 sm:h-20 sm:px-10">
      <SkeletonBlock dark className="h-9 w-9 rounded-full" />
      <SkeletonBlock dark className="h-4 w-40" />
      <SkeletonBlock dark className="ml-auto hidden h-4 w-24 sm:block" />
    </div>

    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        <SkeletonBlock className="h-40 rounded-2xl sm:h-87.5" />
        <SkeletonBlock className="hidden h-87.5 rounded-2xl sm:block" />
        <SkeletonBlock className="h-40 rounded-2xl sm:h-87.5" />
      </div>

      <SkeletonBlock className="h-8 w-64" />

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <SkeletonBlock key={item} className="h-80 w-full rounded-2xl" />
        ))}
      </div>

      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-5/6" />
    </div>
  </div>
);

export default PageSkeleton;
