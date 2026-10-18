import type { Metadata } from "next";
import { CollectionGrid } from "@/components/sections/collection/CollectionGrid";
import { TripQuiz } from "@/components/sections/quiz/TripQuiz";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { collectionsCopy } from "@/content/collections";
import { getCollections } from "@/lib/data/collections";
import { getQuizCandidates } from "@/lib/data/quiz";
import { getSiteUrl } from "@/lib/utils/siteUrl";

const description =
  "Snow trips, summer escapes, long weekends, honeymoons, family holidays and offbeat valleys in Uttarakhand and Himachal. Take the trip quiz or browse ideas by season and mood.";

export const metadata: Metadata = {
  title: "Trip Ideas — Snow, Summer, Honeymoon & Weekend Trips in the Himalayas",
  description,
  keywords: [
    "trip ideas Himalayas",
    "where to travel in Uttarakhand",
    "Himachal trip ideas",
    "best hill station for me",
    "weekend trips from Delhi",
    "snow trips India",
  ],
  alternates: { canonical: "/trips" },
  openGraph: { type: "website", title: "Trip ideas — Lots of Trips", description, url: "/trips" },
  twitter: { card: "summary_large_image", title: "Trip ideas — Lots of Trips", description },
};

export default function TripsPage() {
  const siteUrl = getSiteUrl();
  const collections = getCollections();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: collectionsCopy.eyebrow, item: `${siteUrl}/trips` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: collections.map((collection, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: collection.label,
        url: `${siteUrl}/trips/${collection.slug}`,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <PageHeader
        eyebrow={collectionsCopy.eyebrow}
        title={
          <>
            {collectionsCopy.title} <em>{collectionsCopy.emphasis}</em>
          </>
        }
        description={collectionsCopy.description}
      />
      <TripQuiz candidates={getQuizCandidates()} />
      <section className="container-x pb-section">
        <SectionIntro
          label={collectionsCopy.gridLabel}
          title={
            <>
              {collectionsCopy.gridTitle} <em>{collectionsCopy.gridEmphasis}</em>
            </>
          }
        />
        <div className="mt-12">
          <CollectionGrid collections={collections} />
        </div>
      </section>
    </>
  );
}
