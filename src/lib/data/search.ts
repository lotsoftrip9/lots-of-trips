import { experiences } from "@/content/experiences";
import { normalizeSearchText } from "@/lib/search/searchItems";
import { difficultyLabel, formatAltitude, formatMonthList, stateLabel, tripTypeLabel } from "@/lib/utils/format";
import type { SearchData, SearchItem } from "@/types/search";
import { getDestination, getDestinations } from "./destinations";
import { resolveImage } from "./images";
import { getTours } from "./tours";

const POPULAR = ["manali", "rishikesh", "shimla", "nainital", "kasol", "amritsar"];

const keywordsOf = (...parts: (string | string[])[]) => normalizeSearchText(parts.flat().join(" "));

export function getSearchData(): SearchData {
  const destinations: SearchItem[] = getDestinations().map((destination) => ({
    id: `destination:${destination.slug}`,
    kind: "destination",
    title: destination.name,
    subtitle: `${destination.region} · ${formatAltitude(destination.altitudeM)}`,
    href: `/destinations/${destination.slug}`,
    image: resolveImage({ destination: destination.slug, index: 0 }, destination.name).src,
    keywords: keywordsOf(
      destination.region,
      stateLabel(destination.state),
      destination.tagline,
      destination.highlights,
      destination.types.map(tripTypeLabel),
      formatMonthList(destination.bestMonths),
    ),
  }));

  const tours: SearchItem[] = getTours().map((tour) => {
    const places = tour.destinations.map((slug) => getDestination(slug)?.name ?? slug);
    return {
      id: `tour:${tour.slug}`,
      kind: "tour",
      title: tour.title,
      subtitle: `${tour.durationDays} days · ${difficultyLabel(tour.difficulty)} · ${places.join(", ")}`,
      href: `/tours/${tour.slug}`,
      image: tour.cover.src,
      keywords: keywordsOf(places, tour.summary, difficultyLabel(tour.difficulty), `${tour.durationDays} days`),
    };
  });

  const experienceItems: SearchItem[] = experiences.map((experience) => ({
    id: `experience:${experience.type}`,
    kind: "experience",
    title: experience.label,
    subtitle: experience.description,
    href: `/destinations?type=${experience.type}`,
    image: resolveImage(experience.image, experience.label).src,
    keywords: keywordsOf(tripTypeLabel(experience.type), experience.description),
  }));

  return {
    items: [...destinations, ...tours, ...experienceItems],
    popular: POPULAR.map((slug) => `destination:${slug}`),
    experiences: experienceItems.map((item) => item.id),
  };
}
