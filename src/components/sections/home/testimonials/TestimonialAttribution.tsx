"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { CUBIC } from "@/lib/motion/tokens";
import { initials } from "@/lib/utils/format";
import type { ResolvedTestimonial } from "@/types/site";

export function TestimonialAttribution({ testimonial }: { testimonial: ResolvedTestimonial }) {
  const { name, city, party, tourSlug, tourTitle, travelled } = testimonial;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.7, ease: CUBIC.outExpo } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:mt-12"
      >
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-[13px] font-medium tracking-wide text-ink-soft"
          >
            {initials(name)}
          </span>
          <span>
            <span className="block text-[15px] font-medium">{name}</span>
            <span className="block text-[13px] text-slate">
              {city} · {party}
            </span>
          </span>
        </div>
        <Link
          href={`/tours/${tourSlug}`}
          className="group inline-flex items-center gap-2 self-start text-[14px] sm:self-auto"
        >
          <span className="font-medium text-accent underline-offset-4 group-hover:underline">{tourTitle}</span>
          <span className="text-slate">· {travelled}</span>
          <ArrowUpRight
            className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
