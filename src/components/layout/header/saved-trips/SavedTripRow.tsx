"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { savedTripId, savedTripsStore } from "@/lib/saved-trips/savedTripsStore";
import { SAVED_KIND_LABEL, savedTripHref } from "@/lib/saved-trips/shortlistMessage";
import type { SavedTrip } from "@/types/site";

interface SavedTripRowProps {
  trip: SavedTrip;
  onNavigate: () => void;
}

export function SavedTripRow({ trip, onNavigate }: SavedTripRowProps) {
  return (
    <li className="flex items-center gap-3 py-3">
      <Link href={savedTripHref(trip)} onClick={onNavigate} className="group min-w-0 flex-1">
        <span className="block text-[11px] font-semibold tracking-[0.12em] text-saffron uppercase">
          {SAVED_KIND_LABEL[trip.kind]}
        </span>
        <span className="block truncate text-[15px] font-medium transition-colors group-hover:text-accent">
          {trip.name}
        </span>
      </Link>
      <button
        type="button"
        onClick={() => savedTripsStore.remove(savedTripId(trip))}
        aria-label={`Remove ${trip.name}`}
        className="grid size-9 shrink-0 place-items-center rounded-full text-slate transition-colors hover:bg-paper hover:text-ink"
      >
        <X className="size-4" aria-hidden />
      </button>
    </li>
  );
}
