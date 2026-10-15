import type { ImageRef } from "@/types/tour";

export interface HeroSlideContent {
  image: ImageRef;
  caption: string;
}

export const heroSlides: HeroSlideContent[] = [
  { image: { destination: "manali", index: 0 }, caption: "Solang Valley · Manali" },
  { image: { destination: "dhanaulti", index: 0 }, caption: "Himalayan range · Dhanaulti" },
  { image: { destination: "nainital", index: 0 }, caption: "Naini Lake at dusk · Nainital" },
  { image: { destination: "dalhousie", index: 0 }, caption: "Khajjiar meadow · Dalhousie" },
  { image: { destination: "dharamshala", index: 3 }, caption: "Dhauladhar range · Dharamshala" },
  { image: { destination: "kasol", index: 0 }, caption: "Parvati river · Kasol" },
];
