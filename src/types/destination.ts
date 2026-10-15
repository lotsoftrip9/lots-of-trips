import type { ImageAsset } from "./image";

export type StateSlug = "uttarakhand" | "himachal";

export type TripType =
  | "trek"
  | "pilgrimage"
  | "snow"
  | "wildlife"
  | "hill-station"
  | "offbeat"
  | "adventure"
  | "culture"
  | "lakes";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DestinationContent {
  slug: string;
  name: string;
  state: StateSlug;
  region: string;
  tagline: string;
  description: string;
  altitudeM: number;
  coordinates: Coordinates;
  types: TripType[];
  bestMonths: number[];
  highlights: string[];
}

export interface Destination extends DestinationContent {
  images: ImageAsset[];
}

export interface StateInfo {
  slug: StateSlug;
  name: string;
  epithet: string;
  intro: string;
  description: string;
  heroImage: { destination: string; index: number };
  stats: { label: string; value: string }[];
}
