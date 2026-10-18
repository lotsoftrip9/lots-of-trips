import type { QuizCandidate } from "@/types/quiz";
import { difficultyLabel } from "@/lib/utils/format";
import { getDestination, getDestinations } from "./destinations";
import { getTours } from "./tours";

const typesFor = (slugs: string[]) => [...new Set(slugs.flatMap((slug) => getDestination(slug)?.types ?? []))];

export function getQuizCandidates(): QuizCandidate[] {
  const tours: QuizCandidate[] = getTours().map((tour) => ({
    kind: "tour",
    slug: tour.slug,
    name: tour.title,
    href: `/tours/${tour.slug}`,
    meta: `${tour.durationDays} days · ${difficultyLabel(tour.difficulty)}`,
    summary: tour.summary,
    image: tour.cover,
    months: tour.bestMonths,
    types: typesFor(tour.destinations),
    durationDays: tour.durationDays,
    difficulty: tour.difficulty,
  }));

  const destinations: QuizCandidate[] = getDestinations().map((destination) => ({
    kind: "destination",
    slug: destination.slug,
    name: destination.name,
    href: `/destinations/${destination.slug}`,
    meta: destination.region,
    summary: destination.tagline,
    image: destination.images[0],
    months: destination.bestMonths,
    types: destination.types,
  }));

  return [...tours, ...destinations];
}
