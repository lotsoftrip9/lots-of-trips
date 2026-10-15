import type { StateSlug } from "@/types/destination";

export interface FinderDestination {
  slug: string;
  name: string;
  region: string;
  state: StateSlug;
}

export interface Travellers {
  adults: number;
  children: number;
}

export type FinderFieldId = "destination" | "month" | "travellers";
