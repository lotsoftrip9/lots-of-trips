import type { Metadata } from "next";
import { Suspense } from "react";
import { DestinationExplorer } from "@/components/sections/destinations/DestinationExplorer";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { DestinationMap } from "@/components/sections/map/DestinationMap";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDestinations } from "@/lib/data/destinations";
import { getMapData } from "@/lib/data/map";
import { JsonLd } from "@/components/ui/JsonLd";
import { resolveImage } from "@/lib/data/images";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { getWeatherForAll } from "@/lib/weather/getWeather";

export const metadata: Metadata = {
  title: "Destinations in Uttarakhand & Himachal — Places to Visit in the Himalayas",
  description:
    "Explore 13 curated mountain destinations across Uttarakhand and Himachal Pradesh — Shimla, Manali, Rishikesh, Nainital, Jim Corbett, Kasol, Jibhi, Dharamshala, and more.",
  keywords: [
    "Himalayan travel destinations",
    "places to visit in Uttarakhand",
    "places to visit in Himachal Pradesh",
    "best hill stations in India",
    "Himalayan offbeat places",
    "snow places in Himachal",
    "spiritual places in Uttarakhand",
    "trekking destinations India",
  ],
  alternates: { canonical: "/destinations" },
  openGraph: {
    type: "website",
    title: "Himalayan Destinations — Uttarakhand & Himachal Pradesh",
    description:
      "Explore 13 curated mountain destinations across Uttarakhand and Himachal Pradesh — Shimla, Manali, Rishikesh, Nainital, Jim Corbett, Kasol, Jibhi, Dharamshala, and more.",
    url: "/destinations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himalayan Destinations — Uttarakhand & Himachal Pradesh",
    description:
      "Explore 13 curated mountain destinations across Uttarakhand and Himachal Pradesh — Shimla, Manali, Rishikesh, Nainital, Jim Corbett, Kasol, Jibhi, Dharamshala, and more.",
  },
};

export default async function DestinationsPage() {
  const destinations = getDestinations();
  const weather = await getWeatherForAll(destinations);
  const siteUrl = getSiteUrl();

  const breadcrumbs = {
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
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Destinations"
        title={
          <>
            Where do you want to <em>go?</em>
          </>
        }
        description={`${destinations.length} places across Uttarakhand and Himachal — from Ganga ghats and lake towns to snow valleys and Tibetan monasteries.`}
      />
      <section className="container-x pb-section">
        <Suspense fallback={<DestinationGrid destinations={destinations} />}>
          <DestinationExplorer destinations={destinations} weather={weather} />
        </Suspense>
      </section>
      <DestinationMap data={getMapData(weather)} />
      <PlanCta image={resolveImage({ destination: "shimla", index: 0 }, "Shimla in winter")} />
    </>
  );
}
