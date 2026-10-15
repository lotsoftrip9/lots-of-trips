"use client";

import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useId, useRef, useState } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { useSavedTrips } from "@/hooks/useSavedTrips";
import { cn } from "@/lib/utils/cn";
import { SavedTripsPanel } from "./SavedTripsPanel";

export function SavedTripsMenu({ className }: { className?: string }) {
  const trips = useSavedTrips();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  const count = trips.length;
  const [previousCount, setPreviousCount] = useState(count);
  const [beat, setBeat] = useState(0);

  if (count !== previousCount) {
    if (previousCount > 0 && count === previousCount + 1) setBeat((value) => value + 1);
    setPreviousCount(count);
  }

  useDismiss(rootRef, open, close);

  if (count === 0 && !open) return null;

  return (
    <div ref={rootRef}>
      <motion.button
        type="button"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Your shortlist, ${count} saved`}
        className={cn(
          "relative grid size-8 place-items-center rounded-full transition-colors duration-200",
          open && "bg-paper text-ink",
          className,
        )}
      >
        <motion.span
          key={beat}
          animate={beat ? { scale: [1, 1.35, 0.92, 1.1, 1] } : undefined}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="grid place-items-center"
        >
          <Heart className="size-4" aria-hidden />
        </motion.span>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 18 }}
            aria-hidden
            className="absolute top-0.5 right-0 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-accent px-0.75 text-[9px] leading-none font-semibold text-white tabular-nums"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && <SavedTripsPanel id={panelId} trips={trips} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
