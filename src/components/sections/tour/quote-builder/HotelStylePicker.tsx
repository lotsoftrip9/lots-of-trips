"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { HotelStyle } from "@/types/site";

interface HotelStylePickerProps {
  styles: HotelStyle[];
  value: string;
  label: string;
  onChange: (id: string) => void;
}

export function HotelStylePicker({ styles, value, label, onChange }: HotelStylePickerProps) {
  return (
    <div role="radiogroup" aria-label={label} className="grid gap-2 sm:grid-cols-3">
      {styles.map((style) => {
        const active = style.id === value;
        return (
          <button
            key={style.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(style.id)}
            className={cn(
              "relative flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left ring-1 transition-colors duration-300 ring-inset sm:block",
              active ? "bg-ink text-snow ring-ink" : "ring-line hover:bg-paper",
            )}
          >
            <span>
              <span className="block text-[14px] font-medium">{style.label}</span>
              <span className={cn("mt-0.5 block text-[12.5px]", active ? "text-snow/70" : "text-slate")}>
                {style.description}
              </span>
            </span>
            <Check
              aria-hidden
              className={cn(
                "size-4 shrink-0 transition-opacity duration-300 sm:absolute sm:top-3 sm:right-3",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
