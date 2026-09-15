import {
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ACTIVITY_ICONS = [BookOpenCheck, Dumbbell, HeartHandshake, Sparkles];

const Activities = ({ title, activities }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const updateCarousel = () => {
      const viewport = viewportRef.current;
      const card = trackRef.current?.children[0];

      if (!viewport || !card) return;

      const cardGap = trackRef.current?.children[1]
        ? trackRef.current.children[1].offsetLeft - card.offsetLeft - card.offsetWidth
        : 12;
      const measuredSlideWidth = card.offsetWidth + cardGap;

      setSlideWidth(measuredSlideWidth);
      const visibleCards = Math.max(
        1,
        Math.floor((viewport.clientWidth + cardGap) / measuredSlideWidth),
      );
      const nextMaxIndex = Math.max(0, activities.length - visibleCards);

      setMaxIndex(nextMaxIndex);
      setCurrentIndex((index) => Math.min(index, nextMaxIndex));
    };

    updateCarousel();
    window.addEventListener("resize", updateCarousel);

    return () => window.removeEventListener("resize", updateCarousel);
  }, [activities.length]);

  const scrollToActivity = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused.current) return;

      setCurrentIndex((index) => {
        return index >= maxIndex ? 0 : index + 1;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const showPrevious = () => {
    scrollToActivity(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  };

  const showNext = () => {
    scrollToActivity(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  return (
    <div className="w-full bg-egg px-5 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="flex w-full flex-col items-start gap-3 text-left">
          <h2 className="text-left font-Handpicked-seashells font-bold uppercase text-lg leading-tight text-swamp-green sm:text-xl md:text-2xl">
            {title}
          </h2>
        </div>

        <div className="flex w-full max-w-7xl items-center gap-2 py-7 sm:gap-4 sm:py-8">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous activity"
              className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-swamp-green/20 bg-white text-swamp-green transition-colors hover:bg-swamp-green hover:text-white sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={viewportRef}
            onMouseEnter={() => {
              isPaused.current = true;
            }}
            onMouseLeave={() => {
              isPaused.current = false;
            }}
            onFocus={() => {
              isPaused.current = true;
            }}
            onBlur={() => {
              isPaused.current = false;
            }}
            className="min-w-0 flex-1 overflow-hidden py-1"
          >
            <div
              ref={trackRef}
              className="flex gap-3 transition-transform duration-500 ease-out sm:gap-4"
              style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
            >
              {activities.map((activity, index) => {
                const Icon = ACTIVITY_ICONS[index % ACTIVITY_ICONS.length];

                return (
                <div
                  key={activity.title}
                  className="group relative flex min-h-28 h-auto w-full shrink-0 items-center gap-2 overflow-hidden rounded-xl border-2 border-white bg-swamp-green px-3 py-3 text-white transition-transform duration-300 hover:-translate-y-1 sm:min-h-32 sm:w-[calc((100%-1rem)/2)] sm:gap-3 sm:px-4 lg:w-[calc((100%-2rem)/3)] lg:px-5 xl:w-[calc((100%-3rem)/4)]"
                >
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-r from-[#0c2423] via-[#0c2423]/85 to-[#0c2423]/55" />

                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 text-swamp-green backdrop-blur-sm sm:h-9 sm:w-9">
                      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  </span>

                  <div className="relative z-10 min-w-0">
                    <span className="font-[PoppinsBold] text-[8px] uppercase tracking-[0.15em] text-lime-light/90">
                      Activity 0{index + 1}
                    </span>
                    <h3 className="mt-0.5 font-[PoppinsBold] text-xs leading-tight sm:text-sm">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-2xs leading-snug text-white/80 sm:text-[11px]">
                      {activity.description}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next activity"
              className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-swamp-green/20 bg-white text-swamp-green transition-colors hover:bg-swamp-green hover:text-white sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2" aria-label="Activity slides">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToActivity(index)}
              aria-label={`Show activity group ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-7 bg-swamp-green" : "w-2 bg-swamp-green/25 hover:bg-swamp-green/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;