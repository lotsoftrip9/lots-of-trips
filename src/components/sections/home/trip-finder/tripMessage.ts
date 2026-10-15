import type { Travellers } from "./types";

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

export function formatTravellers({ adults, children }: Travellers) {
  const parts = [plural(adults, "adult", "adults")];
  if (children > 0) parts.push(plural(children, "child", "children"));
  return parts.join(", ");
}

export function buildTripMessage(place: string, month: string, travellers: Travellers) {
  const when = month ? ` in ${month}` : "";
  return `Hi Lots of Trip! I'd like to plan a trip to ${place}${when} for ${formatTravellers(travellers)}.`;
}
