import { destinationContent } from "@/content/destinations";
import { states } from "@/content/states";
import type { Destination, StateSlug, TripType } from "@/types/destination";
import { getImagesFor, resolveImage } from "./images";

const destinations: Destination[] = destinationContent.map((content) => ({
  ...content,
  images: getImagesFor(content.slug, content.name),
}));

export const getDestinations = () => destinations;

export const getDestination = (slug: string) => destinations.find((item) => item.slug === slug);

export const getDestinationsByState = (state: StateSlug) =>
  destinations.filter((item) => item.state === state);

export const getDestinationsByType = (type: TripType) =>
  destinations.filter((item) => item.types.includes(type));

export const getDestinationsForMonth = (month: number) =>
  destinations.filter((item) => item.bestMonths.includes(month));

export function getAdjacentDestination(slug: string) {
  const index = destinations.findIndex((item) => item.slug === slug);
  return destinations[(index + 1) % destinations.length];
}

export const getStates = () => states;

export const getState = (slug: string) => states.find((item) => item.slug === slug);

export function getStateHeroImage(slug: StateSlug) {
  const state = getState(slug);
  if (!state) throw new Error(`Unknown state "${slug}"`);
  return resolveImage(state.heroImage, state.name);
}
