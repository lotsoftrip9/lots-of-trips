import type { ImageAsset } from "./image";

export type Difficulty = "easy" | "moderate" | "challenging";

export interface ImageRef {
  destination: string;
  index: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image: ImageRef;
}

export interface TourContent {
  slug: string;
  title: string;
  summary: string;
  destinations: string[];
  durationDays: number;
  difficulty: Difficulty;
  maxAltitudeM: number;
  groupSize: string;
  bestMonths: number[];
  cover: ImageRef;
  featured?: boolean;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

export interface ResolvedItineraryDay extends Omit<ItineraryDay, "image"> {
  image: ImageAsset;
}

export interface Tour extends Omit<TourContent, "cover" | "itinerary"> {
  cover: ImageAsset;
  itinerary: ResolvedItineraryDay[];
}
