"use client";

import { useEffect } from "react";

export function useScrollLock(active = true) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    root.classList.add("scroll-locked");
    return () => root.classList.remove("scroll-locked");
  }, [active]);
}
