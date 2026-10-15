"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { CUBIC, REVEAL } from "@/lib/motion/tokens";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  onLoad?: boolean;
}

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: REVEAL.distance },
  visible: { opacity: 1, y: 0, transition: { duration: REVEAL.duration, ease: CUBIC.outExpo, delay } },
});

const staggerParent = (delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: REVEAL.stagger, delayChildren: delay } },
});

export function Reveal({ children, className, delay = 0, stagger = false, onLoad = false }: RevealProps) {
  const trigger = onLoad
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={stagger ? staggerParent(delay) : fadeUp(delay)}
      {...trigger}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp()}>
      {children}
    </motion.div>
  );
}
