"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 left-5 z-40 flex size-11 items-center justify-center rounded-full bg-paper shadow-lg ring-1 ring-line ring-inset transition-all duration-300 hover:bg-ink hover:text-snow md:bottom-8"
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}

