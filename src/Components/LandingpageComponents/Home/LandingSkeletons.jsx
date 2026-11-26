const SkeletonBlock = ({ className = "", dark = false }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg ${dark ? "bg-white/10" : "bg-black/10"} ${className}`}
  />
);

export const AcademicProgramsSkeleton = () => (
  <div className="flex flex-col items-center bg-egg pt-5">
    <div className="flex w-full max-w-full flex-col lg:gap-5">
      <div className="flex w-full justify-center pb-5">
        <SkeletonBlock className="h-6 w-48 sm:h-8 sm:w-64" />
      </div>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-5 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <SkeletonBlock
            key={item}
            className="h-80 w-full rounded-2xl lg:h-90"
          />
        ))}
      </div>
    </div>
  </div>
);

export const MissionVisionSkeleton = () => (
  <>
    <div className="w-full bg-egg px-5 pb-12 pt-0 sm:px-10 lg:px-16 lg:pb-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg py-8 lg:mx-0">
          <SkeletonBlock className="relative z-10 mb-8 ml-10 aspect-[1.45/1] w-[85%] rounded-[3.5rem] sm:mb-10 sm:rounded-[4.5rem]" />
        </div>
        <div className="flex w-full flex-col gap-5 pb-12 lg:max-w-xl lg:pb-0">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-12 w-3/4" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
        </div>
      </div>
    </div>

    <div className="w-full bg-[#0c2423] px-5 pb-12 pt-0 sm:px-10 lg:px-16 lg:pb-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg py-8 lg:mx-0">
          <SkeletonBlock
            dark
            className="relative z-10 mb-8 mr-10 aspect-[1.45/1] w-[85%] rounded-[3.5rem] sm:mb-10 sm:rounded-[4.5rem]"
          />
        </div>
        <div className="flex w-full flex-col gap-5 pt-5 lg:max-w-xl">
          <SkeletonBlock dark className="h-4 w-32" />
          <SkeletonBlock dark className="h-12 w-3/4" />
          <SkeletonBlock dark className="h-4 w-full" />
          <SkeletonBlock dark className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  </>
);

export const HymnSkeleton = () => (
  <div className="flex flex-col bg-egg pt-15 pb-0 -mb-10">
    <div className="flex w-full flex-col items-center px-5 py-8">
      <SkeletonBlock className="h-6 w-64 sm:h-8 sm:w-80" />
      <div className="w-full max-w-7xl py-8">
        <SkeletonBlock className="aspect-video w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

export const WhyChooseUsSkeleton = () => (
  <section className="w-full bg-linear-to-br from-forest-green via-[#1d5033] to-parent-green px-5 py-12 sm:py-14 lg:py-16">
    <div className="relative z-10 flex flex-col items-center gap-3">
      <SkeletonBlock dark className="h-1 w-12 rounded-full" />
      <SkeletonBlock dark className="h-8 w-64 sm:h-9 sm:w-80" />
      <SkeletonBlock dark className="h-px w-24" />
    </div>
    <div className="relative z-10 mx-auto flex w-full max-w-240 flex-col items-center gap-5 py-7 sm:py-8">
      <div className="flex w-full flex-wrap justify-center gap-5">
        {[0, 1, 2].map((item) => (
          <SkeletonBlock
            key={item}
            dark
            className="h-24 w-70 max-w-[calc(100vw-2.5rem)] rounded-2xl lg:w-[calc((100%-2.5rem)/3)]"
          />
        ))}
      </div>
    </div>
  </section>
);

export const ActivitiesSkeleton = () => (
  <section className="w-full bg-egg px-5 py-12 sm:px-10 sm:py-16">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
      <div className="flex w-full flex-col items-center gap-3">
        <SkeletonBlock className="h-3 w-32" />
        <SkeletonBlock className="h-8 w-56 sm:h-9 sm:w-64" />
        <SkeletonBlock className="h-1 w-12 rounded-full" />
      </div>
      <div className="w-full max-w-6xl py-7 sm:py-8">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <SkeletonBlock
              key={item}
              className="h-56 w-full rounded-3xl sm:h-64"
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
