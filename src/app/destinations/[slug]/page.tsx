import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationHero } from "@/components/sections/destination/DestinationHero";
import { DestinationLocation } from "@/components/sections/destination/DestinationLocation";
import { DestinationOverview } from "@/components/sections/destination/DestinationOverview";
import { GettingThere } from "@/components/sections/destination/GettingThere";
import { LiveWeather } from "@/components/sections/destination/LiveWeather";
import { NextDestination } from "@/components/sections/destination/NextDestination";
import { PhotoGrid } from "@/components/sections/destination/PhotoGrid";
import { SeasonBar } from "@/components/sections/destination/SeasonBar";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAdjacentDestination, getDestination, getDestinations } from "@/lib/data/destinations";
import { getDestinationFaqs, getGettingThere } from "@/lib/data/guides";
import { getToursForDestination } from "@/lib/data/tours";
import { destinationMapHref } from "@/lib/utils/maps";
import { buildFaqSchema } from "@/lib/utils/schema";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export function generateStaticParams() {
  return getDestinations().map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  const coverImage = destination.images[0]?.src;
  const stateLabel = destination.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
  const title = `${destination.name}, ${stateLabel} — Travel Guide, Weather & Trips`;
  const description = `${destination.description.slice(0, 150)}... Explore ${destination.name} highlights, best months to visit, live weather, and custom itineraries.`;

  return {
    title,
    description,
    keywords: [
      `${destination.name} travel guide`,
      `${destination.name} tour package`,
      `places to visit in ${destination.name}`,
      `best time to visit ${destination.name}`,
      `${destination.name} weather`,
      `${destination.name} ${stateLabel}`,
      ...destination.highlights,
    ],
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      type: "website",
      title: `${destination.name} — ${destination.tagline}`,
      description,
      url: `/destinations/${destination.slug}`,
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 800,
              alt: `${destination.name} in ${stateLabel}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.name} — ${destination.tagline}`,
      description,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const tours = getToursForDestination(destination.slug);
  const faqs = getDestinationFaqs(destination);
  const siteUrl = getSiteUrl();
  const stateName = destination.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: destination.name,
      description: destination.description,
      url: `${siteUrl}/destinations/${destination.slug}`,
      image: destination.images.map((img) => `${siteUrl}${img.src}`),
      geo: {
        "@type": "GeoCoordinates",
        latitude: destination.coordinates.lat,
        longitude: destination.coordinates.lng,
      },
      touristType: destination.types,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: stateName,
      },
      hasMap: `${siteUrl}${destinationMapHref(destination.slug)}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Destinations",
          item: `${siteUrl}/destinations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: destination.name,
          item: `${siteUrl}/destinations/${destination.slug}`,
        },
      ],
    },
    buildFaqSchema(faqs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <DestinationHero destination={destination} />
      <DestinationOverview destination={destination} />
      <LiveWeather destination={destination} />
      <DestinationLocation destination={destination} />
      <GettingThere name={destination.name} legs={getGettingThere(destination.slug)} />
      <PhotoGrid images={destination.images.slice(1)} title={`${destination.name} in pictures`} />
      <SeasonBar months={destination.bestMonths} name={destination.name} />
      {tours.length > 0 && (
        <section className="container-x pb-section">
          <h2 className="text-display-md">Journeys that include {destination.name}</h2>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
        </section>
      )}
      <FaqSection title={`Planning a trip to ${destination.name}`} faqs={faqs} subject={destination.name} />
      <NextDestination destination={getAdjacentDestination(destination.slug)} />
      <PlanCta image={destination.images[1] ?? destination.images[0]} subject={destination.name} />
    </>
  );
}
