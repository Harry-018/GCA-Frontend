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
      className="group flex w-70 max-w-[calc(100vw-2.5rem)] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border border-white/70 bg-bone px-5 py-5 text-center shadow-[0_8px_20px_rgba(9,32,20,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-lime-green hover:shadow-[0_14px_28px_rgba(9,32,20,0.24)] sm:w-[45vw] lg:w-[calc((100%-2.5rem)/3)] lg:max-w-none lg:flex-row lg:justify-start lg:text-left lg:px-7"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-egg text-parent-green transition-colors group-hover:bg-lime-green">
        <Icon aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2.2} />
      </span>
      <p className="min-w-0 flex-1 font-[Poppins] text-xs leading-relaxed text-gray-700 transition-colors group-hover:text-parent-green sm:text-sm">
        {reason}
      </p>
    </div>
  );
};

const WhyChooseUs = ({ title, reasons }) => {
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
    <section
      aria-labelledby="why-choose-us-title"
      className="relative isolate flex w-full flex-col items-center overflow-hidden bg-linear-to-br from-forest-green via-[#1d5033] to-parent-green px-5 py-12 sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-36 border-white/5"
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="h-1 w-12 rounded-full bg-lime-green" />
        <h2
          id="why-choose-us-title"
          className="text-center font-[SuperJoyful] uppercase text-xl leading-tight text-beige sm:text-2xl md:text-3xl"
        >
          {title}
        </h2>
        <span className="h-px w-24 bg-white/25" />
      </div>

      <div className="relative z-10 flex w-full max-w-240 flex-col items-center gap-5 py-7 sm:py-8">
        <div
          ref={scrollRef}
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar sm:gap-5 lg:hidden"
        >
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>

        <div className="hidden w-full flex-wrap justify-center gap-5 lg:flex">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
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
              className={`flex h-6 items-center rounded-full transition-all duration-300 before:h-2 before:rounded-full before:transition-all ${index === activeIndex ? "w-6 before:w-6 before:bg-beige" : "w-6 before:w-2 before:bg-white/35 hover:before:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
