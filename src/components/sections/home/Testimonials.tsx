"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import type { Testimonial } from "@/types/site";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  return (
    <section className="bg-night py-section text-white dark:bg-paper">
      <div className="container-x text-center">
        <p className="eyebrow text-[#d4b483]">Field notes</p>
        <div className="relative mx-auto mt-8 max-w-4xl md:min-h-[17rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: CUBIC.outExpo }}
            >
              <blockquote className="font-serif-display text-display-md text-balance italic">“{current.quote}”</blockquote>
              <figcaption className="mt-8 text-[15px]">
                <span className="font-semibold">{current.name}</span>
                <span className="text-white/50">
                  {" "}
                  · {current.city} · {current.trip}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div role="tablist" aria-label="Testimonials" className="mt-10 flex justify-center gap-2">
          {items.map((item, itemIndex) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Testimonial from ${item.name}`}
              onClick={() => setIndex(itemIndex)}
              className={cn(
                "h-2 rounded-full transition-all duration-500 ease-out-expo",
                itemIndex === index ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
