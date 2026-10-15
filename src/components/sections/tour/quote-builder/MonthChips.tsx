"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { MONTHS, monthShort } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface MonthChipsProps {
  value: string;
  bestMonths: number[];
  bestSeasonLabel: string;
  onChange: (month: string) => void;
}

export function MonthChips({ value, bestMonths, bestSeasonLabel, onChange }: MonthChipsProps) {
  const highlightId = useId();

  return (
    <>
      <div role="radiogroup" aria-label="Travel month" className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {MONTHS.map((month, index) => {
          const active = value === month;
          const best = bestMonths.includes(index + 1);
          return (
            <button
              key={month}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={best ? `${month}, best season` : month}
              onClick={() => onChange(active ? "" : month)}
              className={cn(
                "relative h-11 rounded-full text-[14px] font-medium ring-1 transition-colors duration-300 ring-inset",
                active ? "text-snow ring-transparent" : "ring-line hover:ring-ink/30",
              )}
            >
              {active && (
                <motion.span
                  layoutId={highlightId}
                  transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              )}
              <span className="relative inline-flex items-center gap-1.5">
                {best && (
                  <span aria-hidden className={cn("size-1.5 rounded-full", active ? "bg-accent-light" : "bg-accent")} />
                )}
                {monthShort(index + 1)}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-slate">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        {bestSeasonLabel}
      </p>
    </>
  );
}
