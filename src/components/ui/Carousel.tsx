"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: ReactNode;
  label: string;
  className?: string;
}

export function Carousel({ children, label, className }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <ul ref={trackRef} aria-label={label} className={styles.track}>
        {Children.map(children, (child) => (
          <li className={styles.slide}>{child}</li>
        ))}
      </ul>
      <div className="container-x mt-8 flex justify-end gap-3">
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() => scroll(direction)}
            disabled={direction === -1 ? edges.start : edges.end}
            aria-label={direction === -1 ? "Previous" : "Next"}
            className="grid size-10 place-items-center rounded-full bg-paper text-ink transition-colors duration-200 hover:bg-glacier disabled:cursor-default disabled:opacity-40 disabled:hover:bg-paper"
          >
            {direction === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
          </button>
        ))}
      </div>
    </div>
  );
}
