"use client";

import { motion, useInView, type PanInfo } from "motion/react";
import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { cn } from "@/lib/utils/cn";
import type { ResolvedTestimonial } from "@/types/site";
import { TestimonialAttribution } from "./TestimonialAttribution";
import { TestimonialImages } from "./TestimonialImages";
import { TestimonialQuote } from "./TestimonialQuote";
import { TestimonialTabs } from "./TestimonialTabs";
import styles from "./Testimonials.module.css";

const SWIPE_THRESHOLD = 48;

export function Testimonials({ items }: { items: ResolvedTestimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const panelId = useId();

  const step = (direction: 1 | -1) =>
    setActiveIndex((index) => (index + direction + items.length) % items.length);

  const handleSwipe = (event: PointerEvent, { offset }: PanInfo) => {
    if (event.pointerType !== "touch") return;
    if (Math.abs(offset.x) < SWIPE_THRESHOLD || Math.abs(offset.x) < Math.abs(offset.y)) return;
    step(offset.x < 0 ? 1 : -1);
  };

  return (
    <section
      ref={sectionRef}
      data-paused={!inView || undefined}
      className={cn("container-x pb-section", styles.root)}
    >
      <SectionIntro
        label="Traveller stories"
        title={
          <>
            In their <em>own words.</em>
          </>
        }
      />

      <Reveal className={cn("mt-10 lg:mt-16", styles.stage)}>
        <motion.div
          onPanEnd={handleSwipe}
          className="grid touch-pan-y gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
        >
          <TestimonialImages items={items} activeIndex={activeIndex} className="lg:order-last lg:col-span-5" />
          <div id={panelId} role="tabpanel" className="lg:col-span-7">
            <TestimonialQuote quotes={items.map((item) => item.quote)} activeIndex={activeIndex} />
            <TestimonialAttribution testimonial={items[activeIndex]} />
          </div>
        </motion.div>
      </Reveal>

      <TestimonialTabs
        items={items}
        activeIndex={activeIndex}
        panelId={panelId}
        onSelect={setActiveIndex}
        onComplete={() => step(1)}
        className="mt-10 lg:mt-16"
      />
    </section>
  );
}
