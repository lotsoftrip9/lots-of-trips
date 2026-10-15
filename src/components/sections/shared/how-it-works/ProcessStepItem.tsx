"use client";

import { motion } from "motion/react";
import { CUBIC } from "@/lib/motion/tokens";
import { padIndex } from "@/lib/utils/format";
import type { ProcessStep } from "@/types/site";

const STEP_DELAY = 0.12;

export function ProcessStepItem({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: CUBIC.outExpo, delay: index * STEP_DELAY }}
      className="relative pt-6"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: CUBIC.outExpo, delay: 0.2 + index * STEP_DELAY }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
      />
      <p className="text-[13px] font-semibold text-accent tabular-nums">{padIndex(index)}</p>
      <h3 className="mt-3 text-[1.2rem] leading-snug font-medium tracking-[-0.015em]">{step.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate">{step.description}</p>
    </motion.li>
  );
}
