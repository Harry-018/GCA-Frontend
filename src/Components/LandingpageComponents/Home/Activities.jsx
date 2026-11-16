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
        ? trackRef.current.children[1].offsetLeft -
          card.offsetLeft -
          card.offsetWidth
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
    if (maxIndex === 0) return undefined;

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
    <section
      aria-labelledby="children-activities-title"
      className="w-full bg-egg px-5 py-12 sm:px-10 sm:py-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <span className="font-[PoppinsBold] text-xs uppercase tracking-[0.2em] text-lime-dark">
            Learn · Play · Grow
          </span>
          <h2
            id="children-activities-title"
            className="text-center font-[SuperJoyful] uppercase text-xl leading-tight text-parent-green sm:text-2xl md:text-3xl"
          >
            {title}
          </h2>
          <span className="h-1 w-12 rounded-full bg-lime-dark/70" />
        </div>

        <div className="relative w-full max-w-6xl py-7 sm:py-8">
          {maxIndex > 0 && (
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous activity"
              className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white text-parent-green transition hover:scale-105 hover:bg-parent-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parent-green sm:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div
            ref={viewportRef}
            role="region"
            aria-label="Children activities"
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
            className="min-w-0 overflow-hidden px-1 py-2 sm:px-5"
          >
            <div
              ref={trackRef}
              className={`flex gap-3 transition-transform duration-500 ease-out sm:gap-4 ${maxIndex === 0 ? "justify-center" : ""}`}
              style={{
                transform: `translateX(-${currentIndex * slideWidth}px)`,
              }}
            >
              {activities.map((activity, index) => {
                const Icon = ACTIVITY_ICONS[index % ACTIVITY_ICONS.length];

                return (
                  <div
                    key={activity.title}
                    className="group relative flex h-56 w-full shrink-0 flex-col justify-end overflow-hidden rounded-3xl border-2 border-white bg-forest-green text-white transition-transform duration-300 hover:-translate-y-1 sm:h-64 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                  >
                    <img
                      src={activity.image}
                      alt={activity.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#0c2423]/95 via-[#0c2423]/35 to-transparent" />

                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-[#10271d]/45 px-3 py-1.5 text-xs font-[PoppinsBold] uppercase tracking-wider text-white backdrop-blur-md">
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 text-lime-green"
                        strokeWidth={2}
                      />
                      <span>Activity {String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="relative z-10 min-w-0 px-5 pb-5 pt-12">
                      <h3 className="font-[PoppinsBold] text-base leading-tight sm:text-lg">
                        {activity.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/85 sm:text-sm">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {maxIndex > 0 && (
            <button
              type="button"
              onClick={showNext}
              aria-label="Next activity"
              className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white text-parent-green transition hover:scale-105 hover:bg-parent-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parent-green sm:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {maxIndex > 0 && (
          <div
            className="flex items-center gap-2"
            aria-label="Activity slides"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToActivity(index)}
                aria-label={`Show activity group ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
                className={`flex h-6 items-center rounded-full transition-all duration-300 before:h-2 before:rounded-full before:transition-all ${index === currentIndex ? "w-7 before:w-7 before:bg-swamp-green" : "w-6 before:w-2 before:bg-swamp-green/25 hover:before:bg-swamp-green/50"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Activities;
