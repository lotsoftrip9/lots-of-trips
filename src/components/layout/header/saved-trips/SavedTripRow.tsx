"use client";

import { MapPin, Route, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { savedTripId, savedTripsStore } from "@/lib/saved-trips/savedTripsStore";
import { SAVED_KIND_LABEL, savedTripHref } from "@/lib/saved-trips/shortlistMessage";
import type { SavedTrip } from "@/types/site";

interface SavedTripRowProps {
  trip: SavedTrip;
  onNavigate: () => void;
}

export function SavedTripRow({ trip, onNavigate }: SavedTripRowProps) {
  const FallbackIcon = trip.kind === "tour" ? Route : MapPin;

  return (
    <li className="flex items-center gap-3 py-3">
      <Link href={savedTripHref(trip)} onClick={onNavigate} className="group flex min-w-0 flex-1 items-center gap-3.5">
        <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-paper text-slate">
          {trip.image ? (
            <Image
              src={trip.image}
              alt=""
              fill
              sizes="48px"
              className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-110"
            />
          ) : (
            <FallbackIcon className="size-4" aria-hidden />
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-[10.5px] font-semibold tracking-[0.14em] text-saffron uppercase">
            {SAVED_KIND_LABEL[trip.kind]}
          </span>
          <span className="block truncate text-[15px] font-medium transition-colors group-hover:text-accent">
            {trip.name}
          </span>
        </span>
      </Link>
      <button
        type="button"
        onClick={() => savedTripsStore.remove(savedTripId(trip))}
        aria-label={`Remove ${trip.name}`}
        className="grid size-8 shrink-0 place-items-center rounded-full text-slate transition-colors hover:bg-paper hover:text-ink"
      >
        <X className="size-3.5" aria-hidden />
      </button>
    </li>
  );
}
