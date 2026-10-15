import type { HotelStyle } from "@/types/site";

export const hotelStyles: HotelStyle[] = [
  { id: "comfort", label: "Comfort", description: "Well-rated 3-star stays" },
  { id: "premium", label: "Premium", description: "4-star hotels, better views" },
  { id: "luxury", label: "Luxury", description: "5-star and boutique stays" },
];

export const quoteBuilderCopy = {
  title: "Get your quote on WhatsApp",
  description: "Three quick choices and we reply with an itemised, all-inclusive price.",
  monthLabel: "When are you travelling?",
  bestSeason: "Best season",
  travellersLabel: "Who's travelling?",
  hotelLabel: "Hotel style",
  cta: "Get my quote on WhatsApp",
  formDivider: "or send us the form",
};
