"use client";

import { motion } from "motion/react";
import { AppImage } from "@/components/ui/AppImage";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import type { ResolvedTestimonial } from "@/types/site";

interface TestimonialImagesProps {
  items: ResolvedTestimonial[];
  activeIndex: number;
  className?: string;
}

export function TestimonialImages({ items, activeIndex, className }: TestimonialImagesProps) {
  return (
    <div className={cn("relative aspect-4/3 overflow-hidden rounded-xl bg-paper lg:aspect-4/5", className)}>
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <motion.div
            key={item.name}
            aria-hidden={!active}
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.08 }}
            transition={{ duration: 1.2, ease: CUBIC.outExpo }}
            className="absolute inset-0"
          >
            <AppImage image={item.image} sizes="(min-width: 1024px) 34rem, 100vw" />
          </motion.div>
        );
      })}
    </div>
  );
}
