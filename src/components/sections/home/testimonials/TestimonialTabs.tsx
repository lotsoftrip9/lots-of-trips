import { cn } from "@/lib/utils/cn";
import type { ResolvedTestimonial } from "@/types/site";
import styles from "./Testimonials.module.css";

interface TestimonialTabsProps {
  items: ResolvedTestimonial[];
  activeIndex: number;
  panelId: string;
  onSelect: (index: number) => void;
  onComplete: () => void;
  className?: string;
}

export function TestimonialTabs({ items, activeIndex, panelId, onSelect, onComplete, className }: TestimonialTabsProps) {
  return (
    <div role="tablist" aria-label="Traveller stories" className={cn("grid grid-cols-4 gap-3 sm:gap-6", className)}>
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId}
            onClick={() => onSelect(index)}
            className="group min-w-0 py-2 text-left"
          >
            <span className="relative block h-0.5 overflow-hidden rounded-full bg-line">
              <span
                data-active={active || undefined}
                onAnimationEnd={active ? onComplete : undefined}
                className={cn("absolute inset-0 rounded-full bg-ink", styles.progress)}
              />
            </span>
            <span
              className={cn(
                "mt-3 block truncate text-[13px] font-medium transition-colors duration-300 sm:mt-4 sm:text-[14px]",
                active ? "text-ink" : "text-slate group-hover:text-ink",
              )}
            >
              {item.name}
            </span>
            <span className="mt-0.5 hidden truncate text-[13px] text-slate sm:block">{item.tourTitle}</span>
          </button>
        );
      })}
    </div>
  );
}
