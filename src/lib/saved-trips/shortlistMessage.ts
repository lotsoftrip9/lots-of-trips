import type { SavedTrip, SavedTripKind } from "@/types/site";

export const SAVED_KIND_LABEL: Record<SavedTripKind, string> = {
  tour: "Journey",
  destination: "Destination",
};

export const savedTripHref = ({ kind, slug }: SavedTrip) =>
  kind === "tour" ? `/tours/${slug}` : `/destinations/${slug}`;

export function buildShortlistMessage(trips: SavedTrip[]) {
  const lines = trips.map((trip) => `• ${trip.name}${trip.kind === "tour" ? " (journey)" : ""}`);
  return [
    "Hi Lots of Trips! I've shortlisted these on your website:",
    ...lines,
    "Could you help me plan a trip and share a quote?",
  ].join("\n");
}
