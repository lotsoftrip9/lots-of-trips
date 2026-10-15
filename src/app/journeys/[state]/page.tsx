import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import { StateHero } from "@/components/sections/state/StateHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDestinationsByState, getState, getStateHeroImage, getStates } from "@/lib/data/destinations";
import { getTours } from "@/lib/data/tours";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export function generateStaticParams() {
  return getStates().map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journeys/[state]">): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) return {};

  const heroImage = getStateHeroImage(state.slug);
  const title = `${state.name} Tours & Destinations — Handcrafted Himalayan Trips`;
  const description = `${state.description.slice(0, 155)}... Explore ${state.name} places to visit, signature journeys, and custom travel packages.`;

  return {
    title,
    description,
    keywords: [
      `${state.name} tour packages`,
      `${state.name} tourism`,
      `places to visit in ${state.name}`,
      `best time to visit ${state.name}`,
      `${state.name} road trip itinerary`,
      `${state.name} holiday packages`,
    ],
    alternates: { canonical: `/journeys/${state.slug}` },
    openGraph: {
      type: "website",
      title: `${state.name} — ${state.epithet}`,
      description,
      url: `/journeys/${state.slug}`,
      images: [
        {
          url: heroImage.src,
          width: 1200,
          height: 800,
          alt: `${state.name} - ${state.epithet}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${state.name} — ${state.epithet}`,
      description,
      images: [heroImage.src],
    },
  };
}

export default async function StatePage({ params }: PageProps<"/journeys/[state]">) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const destinations = getDestinationsByState(state.slug);
  const slugs = new Set(destinations.map((item) => item.slug));
  const tours = getTours().filter((tour) => tour.destinations.some((item) => slugs.has(item)));
  const heroImage = getStateHeroImage(state.slug);
  const siteUrl = getSiteUrl();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: state.name,
      description: state.description,
      url: `${siteUrl}/journeys/${state.slug}`,
      image: `${siteUrl}${heroImage.src}`,
      containedInPlace: {
        "@type": "Country",
        name: "India",
      },
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
          name: state.name,
          item: `${siteUrl}/journeys/${state.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <StateHero state={state} image={heroImage} />
      <section className="container-x py-section">
        <h2 className="text-display-md">Destinations in {state.name}</h2>
        <div className="mt-8">
          <DestinationGrid destinations={destinations} />
        </div>
      </section>
      {tours.length > 0 && (
        <section className="container-x pb-section">
          <h2 className="text-display-md">{state.name} journeys</h2>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
        </section>
      )}
      <PlanCta image={destinations[1]?.images[0] ?? destinations[0].images[0]} subject={`a trip to ${state.name}`} />
    </>
  );
}
