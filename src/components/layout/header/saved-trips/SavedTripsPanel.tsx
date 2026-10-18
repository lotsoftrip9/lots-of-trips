"use client";

import { Heart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { savedTripId, savedTripsStore } from "@/lib/saved-trips/savedTripsStore";
import { buildShortlistMessage } from "@/lib/saved-trips/shortlistMessage";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";
import type { SavedTrip } from "@/types/site";
import { HeaderPopover } from "../HeaderPopover";
import { SavedTripRow } from "./SavedTripRow";

interface SavedTripsPanelProps {
  id: string;
  trips: SavedTrip[];
  onClose: () => void;
}

export function SavedTripsPanel({ id, trips, onClose }: SavedTripsPanelProps) {
  return (
    <HeaderPopover
      id={id}
      title="Your shortlist"
      description={`${trips.length > 0 ? `${trips.length} saved · ` : ""}On this device only`}
      closeLabel="Close shortlist"
      onClose={onClose}
    >

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
    </HeaderPopover>
  );
}
