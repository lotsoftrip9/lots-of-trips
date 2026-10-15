import type { Coordinates } from "@/types/destination";

export const destinationMapHref = (slug: string) => `/destinations/${slug}/map`;

export function buildDirectionsUrl({ lat, lng }: Coordinates) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
