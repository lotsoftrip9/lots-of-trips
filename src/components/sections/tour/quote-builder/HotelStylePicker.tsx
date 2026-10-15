"use client";

import { Check, Star } from "lucide-react";
import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";
import type { HotelStyle } from "@/types/site";

interface HotelStylePickerProps {
  styles: HotelStyle[];
  value: string;
  label: string;
  onChange: (id: string) => void;
}

export function HotelStylePicker({ styles, value, label, onChange }: HotelStylePickerProps) {
  const ringId = useId();

  return (
    <div role="radiogroup" aria-label={label} className="grid gap-3 sm:grid-cols-3">
      {styles.map((style) => {
        const active = style.id === value;
        return (
          <button
            key={style.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(style.id)}
            className="relative rounded-xl bg-paper p-4 text-left transition-colors duration-300 hover:bg-glacier/40 sm:p-5"
          >
            {active && (
              <motion.span
                layoutId={ringId}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                className="absolute inset-0 rounded-xl bg-surface ring-2 ring-ink ring-inset"
              />
            )}
            <span className="relative flex items-start justify-between gap-3">
              <span className="flex gap-0.5 text-accent">
                <span className="sr-only">{style.stars}-star</span>
                {Array.from({ length: style.stars }, (_, index) => (
                  <Star key={index} className="size-3 fill-current" aria-hidden />
                ))}
              </span>
              <span
                aria-hidden
                className={cn(
                  "grid size-5 place-items-center rounded-full bg-ink text-snow transition-[transform,opacity] duration-300",
                  active ? "scale-100 opacity-100" : "scale-50 opacity-0",
                )}
              >
                <Check className="size-3" />
              </span>
            </span>
            <span className="relative mt-4 block text-[15px] font-medium">{style.label}</span>
            <span className="relative mt-0.5 block text-[13px] text-slate">{style.description}</span>
          </button>
        );
      })}
    </div>
  );
}
