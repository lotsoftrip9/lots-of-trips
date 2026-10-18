"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

interface HeaderPopoverProps {
  id: string;
  title: string;
  description: ReactNode;
  closeLabel: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export function HeaderPopover({ id, title, description, closeLabel, onClose, className, children }: HeaderPopoverProps) {
  return (
    <motion.div
      id={id}
      role="dialog"
      aria-label={title}
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: CUBIC.outExpo }}
      className={cn(
        "fixed inset-x-3 top-[calc(var(--spacing-header)+env(safe-area-inset-top)+0.5rem)] z-60 origin-top-right rounded-xl bg-surface p-5 text-ink shadow-[0_24px_60px_rgb(0_0_0/0.18)] ring-1 ring-line sm:inset-x-auto sm:right-6 sm:w-96",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[17px] font-medium tracking-[-0.01em]">{title}</p>
          <p className="mt-0.5 text-[13px] text-slate">{description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="-mt-1 -mr-1 grid size-9 place-items-center rounded-full text-slate transition-colors hover:bg-paper hover:text-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
      {children}
    </motion.div>
  );
}
