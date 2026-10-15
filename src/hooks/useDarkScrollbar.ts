"use client";

import { useEffect, type RefObject } from "react";

const ATTRIBUTE = "data-dark-scrollbar";

export function useDarkScrollbar(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const root = document.documentElement;

    const observer = new IntersectionObserver(
      ([entry]) => root.toggleAttribute(ATTRIBUTE, entry.isIntersecting),
      { rootMargin: "0px 0px -50% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      root.removeAttribute(ATTRIBUTE);
    };
  }, [ref]);
}
