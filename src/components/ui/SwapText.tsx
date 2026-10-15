"use client";

import { AnimatePresence, motion } from "motion/react";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

export function SwapText({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: CUBIC.outExpo }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
