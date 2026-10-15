import type { HeaderData } from "@/types/site";
import { difficultyLabel, formatAltitude } from "@/lib/utils/format";
import { getDestinationsByState, getStates } from "./destinations";
import { getTour } from "./tours";

const FEATURED_TOUR = "shimla-manali-classic";

export function getHeaderData(): HeaderData {
  const groups = getStates().map((state) => ({
    label: state.name,
    href: `/journeys/${state.slug}`,
    items: getDestinationsByState(state.slug).map((destination) => ({
      label: destination.name,
      href: `/destinations/${destination.slug}`,
      meta: formatAltitude(destination.altitudeM),
    })),
  }));

  const tour = getTour(FEATURED_TOUR);
  if (!tour) throw new Error(`Featured tour "${FEATURED_TOUR}" not found`);

  return {
    groups,
    feature: {
      eyebrow: "Featured journey",
      title: tour.title,
      meta: `${tour.durationDays} days · ${difficultyLabel(tour.difficulty)}`,
      href: `/tours/${tour.slug}`,
      image: tour.cover,
    },
  };
}
