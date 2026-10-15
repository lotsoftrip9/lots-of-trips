"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { useDarkScrollbar } from "@/hooks/useDarkScrollbar";
import { cn } from "@/lib/utils/cn";
import type { ImageAsset } from "@/types/image";
import styles from "./HeroSlideshow.module.css";

export interface HeroSlide {
  image: ImageAsset;
  caption: string;
}

const INTERVAL_MS = 5000;

export function HeroSlideshow({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  useDarkScrollbar(sectionRef);

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion, slides.length]);

  return (
    <section ref={sectionRef} data-header-overlay className="relative isolate flex flex-col overflow-hidden bg-night text-white md:min-h-svh">
      <div className="absolute inset-0 -z-10" aria-hidden>
        {slides.map((slide, index) => (
          <div key={slide.image.src} className={styles.slide} data-active={index === active || undefined}>
            <AppImage image={slide.image} sizes="100vw" preload={index === 0} alt="" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-linear-to-t from-black/75 via-black/30 to-transparent md:h-[60%]" />
      <div className="absolute inset-y-0 left-0 -z-10 hidden w-2/3 bg-linear-to-r from-black/35 to-transparent md:block" />

      <div className="container-x flex flex-1 flex-col justify-end pt-24 pb-6 sm:pt-32 md:pt-36 md:pb-10">
        {children}

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-1.5" role="tablist" aria-label="Hero photos">
            {slides.map((slide, index) => (
              <button
                key={slide.image.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={slide.caption}
                onClick={() => setActive(index)}
                className="group py-2"
              >
                <span className={styles.track}>
                  <span
                    key={index === active ? `active-${active}` : "idle"}
                    className={cn(styles.fill, index === active && !reducedMotion && styles.running, index === active && reducedMotion && styles.full)}
                  />
                </span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="min-w-0 truncate text-right text-[11px] tracking-[0.18em] text-white/60 uppercase">
            {slides[active].caption}
          </p>
        </div>
      </div>
    </section>
  );
}
