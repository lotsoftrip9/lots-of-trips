"use client";

import { Heart, X } from "lucide-react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { savedTripId, savedTripsStore } from "@/lib/saved-trips/savedTripsStore";
import { buildShortlistMessage } from "@/lib/saved-trips/shortlistMessage";
import { CUBIC } from "@/lib/motion/tokens";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";
import type { SavedTrip } from "@/types/site";
import { SavedTripRow } from "./SavedTripRow";

interface SavedTripsPanelProps {
  id: string;
  trips: SavedTrip[];
  onClose: () => void;
}

export function SavedTripsPanel({ id, trips, onClose }: SavedTripsPanelProps) {
  return (
    <motion.div
      id={id}
      role="dialog"
      aria-label="Your shortlist"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: CUBIC.outExpo }}
      className="fixed inset-x-3 top-[calc(var(--spacing-header)+env(safe-area-inset-top)+0.5rem)] z-60 origin-top-right rounded-xl bg-surface p-5 text-ink shadow-[0_24px_60px_rgb(0_0_0/0.18)] ring-1 ring-line sm:inset-x-auto sm:right-6 sm:w-96"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[17px] font-medium tracking-[-0.01em]">Your shortlist</p>
          <p className="mt-0.5 text-[13px] text-slate">
            {trips.length > 0 && `${trips.length} saved · `}On this device only
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close shortlist"
          className="-mt-1 -mr-1 grid size-9 place-items-center rounded-full text-slate transition-colors hover:bg-paper hover:text-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-lg bg-paper px-6 py-8 text-center">
          <Heart className="size-5 text-slate" aria-hidden />
          <p className="mt-3 text-[14px] font-medium">Nothing saved yet</p>
          <p className="mt-1 text-[13px] text-slate">Tap the heart on any journey or destination to add it here.</p>
        </div>
      ) : (
        <>
          <ul className="mt-3 max-h-[min(50svh,22rem)] divide-y divide-line overflow-y-auto overscroll-contain">
            {trips.map((trip) => (
              <SavedTripRow key={savedTripId(trip)} trip={trip} onNavigate={onClose} />
            ))}
          </ul>
          <ButtonLink
            href={buildWhatsAppMessageLink(buildShortlistMessage(trips))}
            external
            icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
            className="mt-4 w-full"
          >
            Send on WhatsApp
          </ButtonLink>
          <button
            type="button"
            onClick={() => savedTripsStore.clear()}
            className="mt-3 w-full py-1 text-[13px] text-slate transition-colors hover:text-ink"
          >
            Clear all
          </button>
        </>
      )}
    </motion.div>
  );
}
