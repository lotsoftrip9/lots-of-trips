import { formatTravellers } from "@/components/sections/home/trip-finder/tripMessage";
import type { Travellers } from "@/components/sections/home/trip-finder/types";
import type { HotelStyle } from "@/types/site";

interface PlannerRequest {
  place: string;
  month: string;
  travellers: Travellers;
  hotel: HotelStyle;
}

export function buildPlannerMessage({ place, month, travellers, hotel }: PlannerRequest) {
  const when = month ? ` in ${month}` : "";
  return `Hi Lots of Trips! I'd like to plan a trip to ${place}${when} for ${formatTravellers(travellers)}, staying in ${hotel.label.toLowerCase()} hotels.`;
}
