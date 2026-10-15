"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useIsSaved } from "@/hooks/useSavedTrips";
import { savedTripsStore } from "@/lib/saved-trips/savedTripsStore";
import { cn } from "@/lib/utils/cn";
import type { SavedTrip } from "@/types/site";
import { HeartBurst } from "./HeartBurst";

interface SaveTripButtonProps {
  trip: SavedTrip;
  variant?: "overlay" | "pill";
  className?: string;
}

const VARIANTS = {
  overlay: {
    base: "size-10 justify-center rounded-full ring-1 backdrop-blur-md ring-inset",
    idle: "bg-black/35 text-white ring-white/30 hover:bg-black/50",
    saved: "bg-white text-[#d6455d] ring-white",
  },
  pill: {
    base: "h-10 gap-2 rounded-full px-4 text-[10.5px] font-medium tracking-[0.12em] uppercase ring-1 ring-inset sm:h-12 sm:px-6 sm:text-[12px] sm:tracking-[0.16em]",
    idle: "text-ink ring-ink/25 hover:bg-paper",
    saved: "text-[#d6455d] ring-[#d6455d]/40 hover:bg-paper",
  },
};

const SAVE_POP = { scale: [1, 0.7, 1.3, 1] };
const UNSAVE_POP = { scale: [1, 0.8, 1] };

export function SaveTripButton({ trip, variant = "overlay", className }: SaveTripButtonProps) {
  const saved = useIsSaved(trip);
  const reduceMotion = useReducedMotion();
  const [pop, setPop] = useState(0);
  const [burst, setBurst] = useState(0);
  const styles = VARIANTS[variant];
  const label = saved ? `Remove ${trip.name} from your shortlist` : `Save ${trip.name} to your shortlist`;

  const handleClick = () => {
    if (!saved && !reduceMotion) setBurst((count) => count + 1);
    savedTripsStore.toggle(trip);
    setPop((count) => count + 1);
  };

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={label}
      title={label}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center transition-colors duration-300",
        styles.base,
        saved ? styles.saved : styles.idle,
        className,
      )}
    >
      {burst > 0 && saved && <HeartBurst key={burst} />}
      <motion.span
        key={pop}
        animate={pop ? (saved ? SAVE_POP : UNSAVE_POP) : undefined}
        transition={{ duration: saved ? 0.5 : 0.3, ease: "easeOut" }}
        className="relative grid place-items-center"
      >
        <Heart className={cn("size-4.5 transition-[fill] duration-200", saved && "fill-current")} aria-hidden />
      </motion.span>
      {variant === "pill" && <span aria-hidden>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
