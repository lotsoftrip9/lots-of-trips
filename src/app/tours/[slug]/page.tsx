import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AskTripzy } from "@/components/ai/AskTripzy";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { HowItWorks } from "@/components/sections/shared/how-it-works/HowItWorks";
import { Itinerary } from "@/components/sections/tour/Itinerary";
import { RelatedTours } from "@/components/sections/tour/RelatedTours";
import { TourEnquiry } from "@/components/sections/tour/TourEnquiry";
import { TourHero } from "@/components/sections/tour/TourHero";
import { TourInclusions } from "@/components/sections/tour/TourInclusions";
import { TourReview } from "@/components/sections/tour/TourReview";
import { JsonLd } from "@/components/ui/JsonLd";
import { tourQuestions } from "@/content/tripzy";
import { getDestination } from "@/lib/data/destinations";
import { getTourFaqs } from "@/lib/data/guides";
import { getTestimonialForTour } from "@/lib/data/testimonials";
import { getRelatedTours, getTour, getTours } from "@/lib/data/tours";
import { formatNightsDays, truncateAtWord } from "@/lib/utils/format";
import { buildFaqSchema, organizationId } from "@/lib/utils/schema";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export function generateStaticParams() {
  return getTours().map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};

  const nightsDays = formatNightsDays(tour.durationDays);
  const title = `${tour.title} Tour Package — ${nightsDays} Itinerary`;
  const description = truncateAtWord(
    `${nightsDays} ${tour.title} tour package. ${tour.summary} Stays, private cab and sightseeing included — custom quote on WhatsApp.`,
    300,
  );
  const coverImage = tour.cover.src;
  const placeNames = tour.destinations.map((slug) => getDestination(slug)?.name ?? slug);
  const route = placeNames.join(" ");

  return {
    title,
    description,
    keywords: [
      `${tour.title} tour package`,
      `${route} tour package`,
      `${route} tour package from Delhi`,
      `${route} itinerary ${tour.durationDays} days`,
      `${nightsDays} ${route} trip`,
      `${route} family tour`,
      `${route} honeymoon package`,
      ...placeNames.map((name) => `${name} tour package`),
    ],
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      type: "website",
      title: `${tour.title} — ${tour.durationDays} Days Himalayan Journey`,
      description,
      url: `/tours/${tour.slug}`,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 750,
          alt: tour.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} — ${tour.durationDays} Days Himalayan Journey`,
      description,
      images: [coverImage],
    },
  };
}

export default async function TourPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const destinations = tour.destinations.map(getDestination).filter((item) => item !== undefined);
  const related = getRelatedTours(slug);
  const siteUrl = getSiteUrl();
  const faqs = getTourFaqs();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.summary,
      url: `${siteUrl}/tours/${tour.slug}`,
      image: `${siteUrl}${tour.cover.src}`,
      touristType: tour.difficulty,
      itinerary: {
        "@type": "ItemList",
        numberOfItems: tour.itinerary.length,
        itemListElement: tour.itinerary.map((day) => ({
          "@type": "ListItem",
          position: day.day,
          item: {
            "@type": "TouristAttraction",
            name: `Day ${day.day}: ${day.title}`,
            description: day.description,
          },
        })),
      },
      provider: { "@id": organizationId(siteUrl) },
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
          name: "Journeys",
          item: `${siteUrl}/tours`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tour.title,
          item: `${siteUrl}/tours/${tour.slug}`,
        },
      ],
    },
    buildFaqSchema(faqs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <TourHero tour={tour} places={destinations.map((item) => item.name)} />
      <div className="container-x mt-6">
        <AskTripzy questions={tourQuestions(tour.title, tour.durationDays)} />
      </div>
      <Itinerary days={tour.itinerary} slug={tour.slug} title={tour.title} />
      <TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} />
      <section className="container-x pb-section">
        <h2 className="text-display-md">Places on this journey</h2>
        <div className="mt-8">
          <DestinationGrid destinations={destinations} />
        </div>
      </section>
      <HowItWorks />
      <FaqSection title="Before you book" faqs={faqs} subject={`the ${tour.title} journey`} />
      <TourReview testimonial={getTestimonialForTour(tour.slug)} />
      <TourEnquiry tour={tour} places={destinations.map((item) => item.name)} />
      <RelatedTours tours={related} />
    </>
  );
}

