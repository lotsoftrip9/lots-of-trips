import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FullScreenMap } from "@/components/sections/map/FullScreenMap";
import { getDestination, getDestinations } from "@/lib/data/destinations";
import { getMapPlaces } from "@/lib/data/map";
import { destinationMapHref } from "@/lib/utils/maps";

export function generateStaticParams() {
  return getDestinations().map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]/map">): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  return {
    title: `${destination.name} on the map`,
    description: `Where ${destination.name} is in ${destination.region}, with nearby Lots of Trip destinations on an interactive map.`,
    alternates: { canonical: destinationMapHref(destination.slug) },
  };
}

export default async function DestinationMapPage({ params }: PageProps<"/destinations/[slug]/map">) {
  const { slug } = await params;
  if (!getDestination(slug)) notFound();

  return <FullScreenMap key={slug} places={getMapPlaces()} initialSlug={slug} />;
}
