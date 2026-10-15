"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, type ComponentType, type ReactNode, type SVGProps } from "react";
import { SwapText } from "@/components/ui/SwapText";
import { useDismiss } from "@/hooks/useDismiss";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

interface PlannerFieldProps {
  id: string;
  label: string;
  value: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function PlannerField({ id, label, value, Icon, open, onOpenChange, children }: PlannerFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useDismiss(rootRef, open, () => onOpenChange(false));

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "flex w-full items-center gap-3.5 rounded-xl bg-surface px-4 py-3.5 text-left ring-1 transition-[box-shadow,color] duration-300 ring-inset",
          open ? "ring-2 ring-ink" : "ring-line hover:ring-ink/30",
        )}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-paper text-accent">
          <Icon className="size-4.5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold tracking-[0.14em] text-slate uppercase">{label}</span>
          <SwapText value={value} className="mt-0.5 block max-w-full truncate text-[15px] font-medium" />
        </span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 shrink-0 text-slate transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange(false)}
              className="fixed inset-0 z-55 bg-black/30 md:hidden"
            />
            <motion.div
              id={`${id}-panel`}
              role="dialog"
              aria-label={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: CUBIC.outExpo }}
              className="fixed inset-x-3 bottom-3 z-60 overflow-hidden rounded-2xl bg-surface text-ink shadow-[0_24px_60px_-12px_rgb(0_0_0/0.35)] ring-1 ring-line md:absolute md:inset-x-auto md:top-full md:bottom-auto md:left-0 md:mt-2 md:min-w-full"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
