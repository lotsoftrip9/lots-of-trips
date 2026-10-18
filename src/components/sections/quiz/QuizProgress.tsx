"use client";

import { motion } from "motion/react";
import { CUBIC } from "@/lib/motion/tokens";

export function QuizProgress({ value }: { value: number }) {
  return (
    <div aria-hidden className="mt-4 h-1 overflow-hidden rounded-full bg-line">
      <motion.div
        className="h-full origin-left rounded-full bg-accent"
        initial={false}
        animate={{ scaleX: value }}
        transition={{ duration: 0.6, ease: CUBIC.outExpo }}
      />
    </div>
  );
}
