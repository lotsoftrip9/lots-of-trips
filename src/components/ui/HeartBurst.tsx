"use client";

import { motion } from "motion/react";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

const PARTICLE_COUNT = 8;
const RADIUS = 22;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
  const angle = (index / PARTICLE_COUNT) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * RADIUS,
    y: Math.sin(angle) * RADIUS,
    gold: index % 2 === 1,
  };
});

export function HeartBurst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      <motion.span
        initial={{ scale: 0.4, opacity: 0.7 }}
        animate={{ scale: 1.9, opacity: 0 }}
        transition={{ duration: 0.6, ease: CUBIC.outExpo }}
        className="col-start-1 row-start-1 size-full rounded-full ring-2 ring-[#d6455d]"
      />
      {particles.map(({ x, y, gold }, index) => (
        <motion.span
          key={index}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{ x, y, scale: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: CUBIC.outExpo, delay: 0.05 }}
          className={cn(
            "col-start-1 row-start-1 size-1.5 rounded-full",
            gold ? "bg-accent-light" : "bg-[#d6455d]",
          )}
        />
      ))}
    </span>
  );
}
