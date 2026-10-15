"use client";

import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { HotelStyle } from "@/types/site";

interface HotelChoiceListProps {
  styles: HotelStyle[];
  value: string;
  onSelect: (id: string) => void;
}

export function HotelChoiceList({ styles, value, onSelect }: HotelChoiceListProps) {
  return (
    <div role="listbox" aria-label="Hotel style" className="p-2 lg:w-76">
      {styles.map((style) => {
        const selected = style.id === value;
        return (
          <button
            key={style.id}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(style.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
              selected ? "bg-paper" : "hover:bg-paper",
            )}
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="text-[15px] font-medium">{style.label}</span>
                <span className="flex gap-0.5 text-accent">
                  <span className="sr-only">{style.stars}-star</span>
                  {Array.from({ length: style.stars }, (_, index) => (
                    <Star key={index} className="size-2.5 fill-current" aria-hidden />
                  ))}
                </span>
              </span>
              <span className="block text-[12.5px] text-slate">{style.description}</span>
            </span>
            {selected && <Check className="size-4 shrink-0 text-accent" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}
