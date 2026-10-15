import type { Travellers } from "./types";

export const MAX_TRAVELLERS = 20;

export const TRAVELLER_ROWS: { key: keyof Travellers; label: string; hint: string; min: number }[] = [
  { key: "adults", label: "Adults", hint: "Ages 13 and above", min: 1 },
  { key: "children", label: "Children", hint: "Ages 2 – 12", min: 0 },
];
