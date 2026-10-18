import { collectionContent } from "@/content/collections";
import type { CollectionFilter, TripCollection } from "@/types/collection";
import type { Destination } from "@/types/destination";
import type { Tour } from "@/types/tour";
import { getDestinations } from "./destinations";
import { resolveImage } from "./images";
import { getTours } from "./tours";

const overlaps = (a: number[], b: number[]) => a.some((value) => b.includes(value));

const matchesDestination = (destination: Destination, filter: CollectionFilter) =>
  (!filter.destinations || filter.destinations.includes(destination.slug)) &&
  (!filter.types || destination.types.some((type) => filter.types?.includes(type))) &&
  (!filter.months || overlaps(destination.bestMonths, filter.months));

const matchesTour = (tour: Tour, slugs: Set<string>, filter: CollectionFilter) =>
  tour.destinations.some((slug) => slugs.has(slug)) &&
  (!filter.months || overlaps(tour.bestMonths, filter.months)) &&
  (!filter.maxDays || tour.durationDays <= filter.maxDays) &&
  (!filter.difficulty || filter.difficulty.includes(tour.difficulty));

const collections: TripCollection[] = collectionContent.map((content) => {
  const destinations = getDestinations().filter((destination) => matchesDestination(destination, content.filter));
  const slugs = new Set(destinations.map((destination) => destination.slug));

  return {
    ...content,
    image: resolveImage(content.image, content.label),
    destinations,
    tours: getTours().filter((tour) => matchesTour(tour, slugs, content.filter)),
  };
});

export const getCollections = () => collections;

export const getCollection = (slug: string) => collections.find((collection) => collection.slug === slug);

export const getOtherCollections = (slug: string, limit = 3) =>
  collections.filter((collection) => collection.slug !== slug).slice(0, limit);
