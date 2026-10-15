"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

const roll: Variants = {
  enter: (direction: number) => ({ y: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? "-100%" : "100%", opacity: 0 }),
};

export function RollingNumber({ value, className }: { value: number; className?: string }) {
  const [previous, setPrevious] = useState(value);
  const [direction, setDirection] = useState(1);

  if (value !== previous) {
    setDirection(value > previous ? 1 : -1);
    setPrevious(value);
  }

  return (
    <span className={cn("relative inline-grid overflow-hidden tabular-nums", className)} aria-live="polite">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.span
          key={value}
          custom={direction}
          variants={roll}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: CUBIC.outExpo }}
          className="col-start-1 row-start-1 text-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
