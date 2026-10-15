"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { CUBIC, IMAGE_REVEAL } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  rounded?: boolean;
}

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

function clip(insetPercent: number, rounded: boolean) {
  const radius = rounded ? ` round ${IMAGE_REVEAL.radius}` : "";
  return `inset(${insetPercent}% ${insetPercent}% ${insetPercent}% ${insetPercent}%${radius})`;
}

export function RevealImage({ children, className, delay = 0, rounded = true }: RevealImageProps) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: IMAGE_REVEAL.duration, ease: CUBIC.outExpo, delay };

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduceMotion ? false : { clipPath: clip(IMAGE_REVEAL.insetPercent, rounded) }}
      whileInView={{ clipPath: clip(0, rounded) }}
      viewport={VIEWPORT}
      transition={transition}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: IMAGE_REVEAL.scale }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
