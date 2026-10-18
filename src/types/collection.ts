import type { Destination, TripType } from "./destination";
import type { Faq } from "./guide";
import type { ImageAsset } from "./image";
import type { Difficulty, ImageRef, Tour } from "./tour";

export interface CollectionFilter {
  destinations?: string[];
  types?: TripType[];
  months?: number[];
  maxDays?: number;
  difficulty?: Difficulty[];
}

export interface TripCollectionContent {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
  teaser: string;
  image: ImageRef;
  filter: CollectionFilter;
  goodToKnow: string[];
  faqs: Faq[];
  subject: string;
  keywords: string[];
}

export interface TripCollection extends Omit<TripCollectionContent, "image"> {
  image: ImageAsset;
  destinations: Destination[];
  tours: Tour[];
}
