export type TravelMode = "air" | "rail" | "road";

export interface TravelLeg {
  mode: TravelMode;
  hub: string;
  distanceKm: number;
  note: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface PolicySection {
  heading: string;
  body: string[];
}

export interface Policy {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: PolicySection[];
}
