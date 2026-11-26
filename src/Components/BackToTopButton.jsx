import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      setVisible(scrollY + innerHeight >= scrollHeight - 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-1/2 z-50 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-parent-green text-white shadow-lg transition hover:bg-parent-accent active:scale-95"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
};

export default BackToTopButton;
