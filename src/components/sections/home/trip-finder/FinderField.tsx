"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, type ComponentType, type ReactNode, type SVGProps } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

interface FinderFieldProps {
  id: string;
  label: string;
  value: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  panelClassName?: string;
  children: ReactNode;
}

export function FinderField({
  id,
  label,
  value,
  Icon,
  open,
  onOpenChange,
  panelClassName,
  children,
}: FinderFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useDismiss(rootRef, open, () => onOpenChange(false));

  return (
    <div ref={rootRef} className="relative flex-1">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left transition-colors duration-200 sm:px-5 sm:py-3.5 md:py-2",
          open ? "bg-white/15" : "hover:bg-white/10",
        )}
      >
        <Icon className="size-4 shrink-0 text-[#f0d3a0]" aria-hidden />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">{label}</span>
          <span className="truncate text-[14px] text-white sm:text-[15px]">{value}</span>
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-white/60 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="dialog"
            aria-label={label}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: CUBIC.outExpo }}
            className={cn(
              "absolute bottom-full left-0 z-50 mb-3 w-full origin-bottom overflow-hidden rounded-2xl bg-surface text-ink shadow-[0_24px_60px_-12px_rgb(0_0_0/0.45)] ring-1 ring-line md:w-auto md:min-w-full",
              panelClassName,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
