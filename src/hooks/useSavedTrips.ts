"use client";

import { useSyncExternalStore } from "react";
import { savedTripId, savedTripsStore } from "@/lib/saved-trips/savedTripsStore";
import type { SavedTrip } from "@/types/site";

export function useSavedTrips() {
  return useSyncExternalStore(
    savedTripsStore.subscribe,
    savedTripsStore.getSnapshot,
    savedTripsStore.getServerSnapshot,
  );
}

export function useIsSaved(trip: Pick<SavedTrip, "kind" | "slug">) {
  const id = savedTripId(trip);
  return useSavedTrips().some((item) => savedTripId(item) === id);
}
