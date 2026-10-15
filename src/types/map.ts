import type { Coordinates, StateSlug } from "./destination";
import type { ImageAsset } from "./image";
import type { CurrentWeather } from "./weather";

export interface MapState {
  key: string;
  name: string;
  focus: boolean;
  path: string;
}

export interface MapLabel {
  text: string;
  x: number;
  y: number;
}

export type MapLabelSide = "left" | "right" | "top" | "bottom";

export interface MapDestination {
  slug: string;
  name: string;
  region: string;
  state: StateSlug;
  tagline: string;
  altitudeM: number;
  bestMonths: number[];
  image: ImageAsset;
  weather: CurrentWeather | null;
  x: number;
  y: number;
  labelSide: MapLabelSide;
}

export interface MapData {
  width: number;
  height: number;
  states: MapState[];
  labels: MapLabel[];
  destinations: MapDestination[];
}

export interface MapPlace {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  altitudeM: number;
  bestMonths: number[];
  coordinates: Coordinates;
  image: ImageAsset;
}
