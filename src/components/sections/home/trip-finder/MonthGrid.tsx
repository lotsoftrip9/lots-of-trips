"use client";

import { cn } from "@/lib/utils/cn";
import { MONTHS, monthShort } from "@/lib/utils/format";

interface MonthGridProps {
  value: string;
  onSelect: (month: string) => void;
}

export function MonthGrid({ value, onSelect }: MonthGridProps) {
  return (
    <div className="p-4 md:w-80">
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
      <div className="grid grid-cols-4 gap-1.5 md:grid-cols-3">
        {MONTHS.map((month, index) => {
          const active = value === month;
          return (
            <button
              key={month}
              type="button"
              aria-pressed={active}
              aria-label={month}
              onClick={() => onSelect(month)}
              className={cn(
                "rounded-xl py-2.5 text-[14px] font-medium transition-colors",
                active ? "bg-ink text-snow" : "hover:bg-paper",
              )}
            >
              {monthShort(index + 1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
