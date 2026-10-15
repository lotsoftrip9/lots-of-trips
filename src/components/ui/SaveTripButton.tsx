"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useIsSaved } from "@/hooks/useSavedTrips";
import { savedTripsStore } from "@/lib/saved-trips/savedTripsStore";
import { cn } from "@/lib/utils/cn";
import type { SavedTrip } from "@/types/site";

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

export function SaveTripButton({ trip, variant = "overlay", className }: SaveTripButtonProps) {
  const saved = useIsSaved(trip);
  const styles = VARIANTS[variant];
  const label = saved ? `Remove ${trip.name} from your shortlist` : `Save ${trip.name} to your shortlist`;

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={label}
      title={label}
      onClick={() => savedTripsStore.toggle(trip)}
      className={cn(
        "inline-flex items-center transition-colors duration-300",
        styles.base,
        saved ? styles.saved : styles.idle,
        className,
      )}
    >
      <motion.span
        key={saved ? "saved" : "idle"}
        initial={{ scale: saved ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 14 }}
        className="grid place-items-center"
      >
        <Heart className={cn("size-4.5", saved && "fill-current")} aria-hidden />
      </motion.span>
      {variant === "pill" && <span aria-hidden>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
