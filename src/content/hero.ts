import type { ImageRef } from "@/types/tour";

export interface HeroSlideContent {
  image: ImageRef;
  caption: string;
}

export const heroSlides: HeroSlideContent[] = [
  { image: { destination: "manali", index: 0 }, caption: "Solang Valley · Manali" },
  { image: { destination: "nainital", index: 0 }, caption: "Naini Lake at dusk · Nainital" },
  { image: { destination: "jibhi", index: 0 }, caption: "Serolsar Lake · Jibhi" },
  { image: { destination: "shimla", index: 1 }, caption: "The Ridge · Shimla" },
  { image: { destination: "kasol", index: 0 }, caption: "Parvati river · Kasol" },
  { image: { destination: "haridwar", index: 2 }, caption: "Har Ki Pauri · Haridwar" },
  { image: { destination: "dharamshala", index: 0 }, caption: "Triund · Dharamshala" },
  { image: { destination: "dhanaulti", index: 0 }, caption: "Himalayan range · Dhanaulti" },
  { image: { destination: "amritsar", index: 0 }, caption: "Golden Temple · Amritsar" },
];
