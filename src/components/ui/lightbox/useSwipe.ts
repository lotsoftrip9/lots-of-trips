"use client";

import { useRef, type PointerEvent } from "react";

const SWIPE_THRESHOLD_PX = 50;

export function useSwipe({ onLeft, onRight }: { onLeft: () => void; onRight: () => void }) {
  const startX = useRef<number | null>(null);

  return {
    onPointerDown: (event: PointerEvent) => {
      startX.current = event.clientX;
    },
    onPointerUp: (event: PointerEvent) => {
      if (startX.current === null) return;
      const delta = event.clientX - startX.current;
      startX.current = null;
      if (delta <= -SWIPE_THRESHOLD_PX) onLeft();
      if (delta >= SWIPE_THRESHOLD_PX) onRight();
    },
  };
}
