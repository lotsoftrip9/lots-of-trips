"use client";

import { cn } from "@/lib/utils/cn";
import { MONTHS, monthShort } from "@/lib/utils/format";

interface MonthGridProps {
  value: string;
  onSelect: (month: string) => void;
  highlight?: number[];
  className?: string;
  gridClassName?: string;
}

export function MonthGrid({ value, onSelect, highlight = [], className, gridClassName }: MonthGridProps) {
  return (
    <div className={cn("p-4 md:w-80", className)}>
      <button
        type="button"
        aria-pressed={value === ""}
        onClick={() => onSelect("")}
        className={cn(
          "w-full rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors",
          value === "" ? "bg-ink text-snow" : "bg-paper hover:bg-glacier/60",
        )}
      >
        I&apos;m flexible
      </button>
      <p className="mt-4 mb-2 text-[10px] font-semibold tracking-[0.2em] text-saffron uppercase">Pick a month</p>
      <div className={cn("grid grid-cols-4 gap-1.5 md:grid-cols-3", gridClassName)}>
        {MONTHS.map((month, index) => {
          const active = value === month;
          const recommended = highlight.includes(index + 1);
          return (
            <button
              key={month}
              type="button"
              aria-pressed={active}
              aria-label={recommended ? `${month}, best season` : month}
              onClick={() => onSelect(month)}
              className={cn(
                "relative rounded-xl py-2.5 text-[14px] font-medium transition-colors",
                active ? "bg-ink text-snow" : "hover:bg-paper",
              )}
            >
              {monthShort(index + 1)}
              {recommended && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1.5 right-1.5 size-1.5 rounded-full",
                    active ? "bg-accent-light" : "bg-accent",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
