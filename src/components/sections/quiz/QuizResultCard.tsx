"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Chevron } from "@/components/ui/ButtonLink";
import { CUBIC } from "@/lib/motion/tokens";
import type { QuizCandidate } from "@/types/quiz";

interface QuizResultCardProps {
  candidate: QuizCandidate;
  index: number;
  sizes: string;
}

export function QuizResultCard({ candidate, index, sizes }: QuizResultCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: CUBIC.outExpo, delay: 0.1 + index * 0.07 }}
    >
      <Link
        href={candidate.href}
        className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-line ring-inset transition-shadow duration-500 hover:shadow-[0_20px_50px_rgb(0_0_0/0.1)]"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <AppImage
            image={candidate.image}
            sizes={sizes}
            className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="eyebrow text-saffron">{candidate.meta}</p>
          <p className="mt-2 text-[19px] font-medium tracking-tight">{candidate.name}</p>
          <p className="mt-1 line-clamp-2 text-[14px] text-slate">{candidate.summary}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-medium text-accent">
            Take a look <Chevron />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}
