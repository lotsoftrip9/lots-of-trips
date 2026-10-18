import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { CollectionGoodToKnow } from "@/components/sections/collection/CollectionGoodToKnow";
import { CollectionGrid } from "@/components/sections/collection/CollectionGrid";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { collectionsCopy } from "@/content/collections";
import { getCollection, getCollections, getOtherCollections } from "@/lib/data/collections";
import { buildFaqSchema } from "@/lib/utils/schema";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

export function generateStaticParams() {
  return getCollections().map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trips/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};

  const title = `${collection.label} in Uttarakhand & Himachal`;
  const url = `/trips/${collection.slug}`;
  const images = [{ url: collection.image.src, width: 1200, height: 800, alt: collection.image.alt }];

  return {
    title,
    description: collection.description,
    keywords: collection.keywords,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description: collection.description, url, images },
    twitter: { card: "summary_large_image", title, description: collection.description, images: [collection.image.src] },
  };
}

export default async function CollectionPage({ params }: PageProps<"/trips/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const siteUrl = getSiteUrl();
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: collectionsCopy.eyebrow, item: `${siteUrl}/trips` },
        { "@type": "ListItem", position: 3, name: collection.label, item: `${siteUrl}/trips/${collection.slug}` },
      ],
    },
    buildFaqSchema(collection.faqs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <PageHeader
        eyebrow={collection.eyebrow}
        title={
          <>
            {collection.title} <em>{collection.emphasis}</em>
          </>
        }
        description={collection.description}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink
            href={buildWhatsAppLink(collection.subject)}
            external
            data-va-cta={`collection-${collection.slug}-whatsapp`}
            icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
          >
            {collectionsCopy.whatsappCta}
          </ButtonLink>
          <ButtonLink href="/trips#trip-quiz" variant="outline">
            {collectionsCopy.quizCta}
          </ButtonLink>
        </div>
      </PageHeader>

      <CollectionGoodToKnow image={collection.image} items={collection.goodToKnow} />

      {collection.destinations.length > 0 && (
        <section className="container-x pb-section">
          <h2 className="text-display-md">{collectionsCopy.destinationsTitle}</h2>
          <div className="mt-8">
            <DestinationGrid destinations={collection.destinations} />
          </div>
        </section>
      )}

      {collection.tours.length > 0 && (
        <section className="container-x pb-section">
          <h2 className="text-display-md">{collectionsCopy.toursTitle}</h2>
          <div className="mt-8">
            <TourGrid tours={collection.tours} />
          </div>
        </section>
      )}

      <FaqSection title={`${collection.label}: your questions`} faqs={collection.faqs} subject={collection.subject} />

      <section className="container-x pb-section">
        <h2 className="text-display-md">{collectionsCopy.moreLabel}</h2>
        <div className="mt-8">
          <CollectionGrid collections={getOtherCollections(collection.slug)} />
        </div>
      </section>

      <PlanCta image={collection.destinations[0]?.images[1] ?? collection.image} subject={collection.subject} />
    </>
  );
}
