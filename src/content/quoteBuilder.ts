import type { HotelStyle } from "@/types/site";

export const hotelStyles: HotelStyle[] = [
  { id: "comfort", label: "Comfort", description: "Well-rated 3-star stays", stars: 3 },
  { id: "premium", label: "Premium", description: "4-star hotels, better views", stars: 4 },
  { id: "luxury", label: "Luxury", description: "5-star and boutique stays", stars: 5 },
];

export const quoteBuilderCopy = {
  eyebrow: "Plan this journey",
  intro: "Three quick choices. We reply on WhatsApp with an itemised, all-inclusive price.",
  steps: {
    month: "When would you like to go?",
    travellers: "Who's travelling?",
    hotel: "Where would you like to stay?",
  },
  flexible: "Flexible dates",
  bestSeason: "Best season for this journey",
  summaryEyebrow: "Your trip",
  summary: {
    month: "When",
    travellers: "Travellers",
    hotel: "Hotels",
  },
  flexibleValue: "Flexible",
  cta: "Get my quote on WhatsApp",
  callPrompt: "Prefer to talk?",
  assurances: ["Free, no-obligation quote", "All-inclusive, no hidden charges", "Reply within a few hours"],
};

export const tripPlannerCopy = {
  eyebrow: "Plan your journey",
  title: "Your trip, quoted in",
  emphasis: "a few hours.",
  intro: "Pick four details and send them to us on WhatsApp. We reply with an itemised, all-inclusive quote.",
  fields: {
    destination: "Where to?",
    month: "When?",
    travellers: "Travellers",
    hotel: "Hotel style",
  },
  anywhere: "Anywhere in the hills",
  flexibleMonth: "I'm flexible",
  replyNote: "Usually replies within a few hours",
  previewLabel: "Your message",
  previewTime: "now",
  cta: "Send on WhatsApp",
  note: "Free and no obligation. Nothing is booked until you confirm.",
};
