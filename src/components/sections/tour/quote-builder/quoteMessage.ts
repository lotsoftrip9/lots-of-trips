import { formatTravellers } from "@/components/sections/home/trip-finder/tripMessage";
import type { Travellers } from "@/components/sections/home/trip-finder/types";
import type { HotelStyle } from "@/types/site";

interface QuoteRequest {
  tourTitle: string;
  durationDays: number;
  month: string;
  travellers: Travellers;
  hotel: HotelStyle;
}

export function buildQuoteMessage({ tourTitle, durationDays, month, travellers, hotel }: QuoteRequest) {
  const when = month ? `in ${month}` : "on flexible dates";
  return `Hi Lots of Trips! I'd like a quote for the ${tourTitle} journey (${durationDays} days) ${when} for ${formatTravellers(travellers)}, with ${hotel.label.toLowerCase()} hotels.`;
}
