import { useLayoutEffect, useRef, useState } from "react";
import {
  BookOpenCheck,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  SmilePlus,
} from "lucide-react";

const REASON_ICONS = [
  HeartHandshake,
  BookOpenCheck,
  ShieldCheck,
  SmilePlus,
  Lightbulb,
];

const ReasonCard = ({ reason, index }) => {
  const Icon = REASON_ICONS[index % REASON_ICONS.length];

  return (
    <div
      data-reason-card
      className="group flex w-70 max-w-85 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-[#f4f5fc] px-5 py-5 text-center shadow-[0_3px_5px_rgba(55,55,55,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-lime-dark/40 hover:shadow-[0_8px_16px_rgba(55,55,55,0.16)] sm:w-[45vw] lg:w-full lg:max-w-none lg:flex-row lg:justify-start lg:text-left lg:px-7"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-dark/15 text-swamp-green transition-colors group-hover:bg-lime-dark/25">
        <Icon aria-hidden="true" 
        className="h-4.5 w-4.5" 
        strokeWidth={2.2} />
      </span>
      <p className="min-w-0 flex-1 font-[Poppins] text-xs leading-relaxed text-gray-600 transition-colors group-hover:text-egg-dark sm:text-sm">
        {reason}
      </p>
    </div>
  );
};

const WhyChooseUs = ({ title, reasons }) => {
  const firstRowLength = Math.ceil(reasons.length / 2);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getStep = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll("[data-reason-card]");
    if (cards.length < 2) return 0;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(index, reasons.length - 1));
  };

  const scrollToCard = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    handleScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center bg-[#eeece8] px-5 py-10 sm:py-12 lg:py-16">
      <div className="flex flex-col items-center gap-3">
        <span className="h-1 w-10 rounded-full bg-lime-dark/70" />
        <h2 className="text-center font-Handpicked-seashells font-bold uppercase text-lg leading-tight text-swamp-green/75 sm:text-xl md:text-2xl">
          {title}
        </h2>
        <span className="h-px w-24 bg-swamp-green/20" />
      </div>

      <div className="flex w-full max-w-240 flex-col items-center gap-5 py-7 sm:py-8">
        <div
          ref={scrollRef}
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar sm:gap-5 lg:hidden"
        >
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              reason={reason}
              index={index}
            />
          ))}
        </div>

        <div className="hidden w-full flex-col gap-5 lg:flex">
          <div className="grid w-full grid-cols-3 gap-5">
            {reasons.slice(0, firstRowLength).map((reason, index) => (
              <ReasonCard
                key={index}
                reason={reason}
                index={index}
              />
            ))}
          </div>
          <div className="grid w-full max-w-160 grid-cols-2 gap-5 self-center">
            {reasons.slice(firstRowLength).map((reason, index) => (
              <ReasonCard
                key={index}
                reason={reason}
                index={firstRowLength + index}
              />
            ))}
          </div>
        </div>

        <div
          className="flex items-center gap-2 lg:hidden"
          aria-label="Why choose us slides"
        >
          {reasons.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={`Go to reason ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-lime-dark"
                  : "w-2 bg-swamp-green/30 hover:bg-swamp-green/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;