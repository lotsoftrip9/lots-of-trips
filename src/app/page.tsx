import type { Metadata } from "next";
import { DestinationGallery } from "@/components/sections/home/DestinationGallery";
import { ExperienceGrid } from "@/components/sections/home/ExperienceGrid";
import { FeaturedTours } from "@/components/sections/home/FeaturedTours";
import { Hero } from "@/components/sections/home/Hero";
import { InstagramStrip } from "@/components/sections/home/InstagramStrip";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { SeasonStrip } from "@/components/sections/home/SeasonStrip";
import { Testimonials } from "@/components/sections/home/testimonials/Testimonials";
import { TwoStates } from "@/components/sections/home/TwoStates";
import { TripPlanner } from "@/components/sections/home/trip-planner/TripPlanner";
import { DestinationMap } from "@/components/sections/map/DestinationMap";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { HowItWorks } from "@/components/sections/shared/how-it-works/HowItWorks";
import { JsonLd } from "@/components/ui/JsonLd";
import { experiences } from "@/content/experiences";
import { homeFaqs } from "@/content/faqs";
import { heroSlides } from "@/content/hero";
import { siteConfig } from "@/content/site";
import {
  getDestinations,
  getDestinationsByType,
  getStateHeroImage,
  getStates,
} from "@/lib/data/destinations";
import { resolveImage } from "@/lib/data/images";
import { getMapData } from "@/lib/data/map";
import { getTestimonials } from "@/lib/data/testimonials";
import { getFeaturedTours } from "@/lib/data/tours";
import { buildFaqSchema, buildOrganizationSchema, organizationId } from "@/lib/utils/schema";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { getWeatherForAll } from "@/lib/weather/getWeather";

export const metadata: Metadata = {
  title: { absolute: "Uttarakhand & Himachal Tour Packages | Lots of Trips" },
  description:
    "Custom Uttarakhand & Himachal tour packages — Manali, Shimla, Kasol, Rishikesh, Nainital & Jim Corbett. Planned by Dehradun locals with handpicked stays and private cabs.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Uttarakhand tour packages",
    "Himachal tour packages",
    "Himachal Pradesh tour packages",
    "Shimla Manali tour package",
    "Manali Kasol tour package",
    "Haridwar Rishikesh Mussoorie tour package",
    "Nainital Jim Corbett tour package",
    "Amritsar Dharamshala Dalhousie tour",
    "Kasol Jibhi trip",
    "Mussoorie Dhanaulti weekend trip",
    "Himachal tour package from Delhi",
    "Uttarakhand tour package from Delhi",
    "hill station trips near Delhi",
    "Himachal honeymoon package",
    "Uttarakhand family tour package",
    "Jim Corbett jungle safari booking",
    "Rishikesh river rafting",
    "travel agency in Dehradun",
  ],
  openGraph: {
    type: "website",
    title: "Lots of Trips — Handcrafted Journeys in Uttarakhand & Himachal",
    description:
      "Small-group journeys, treks and pilgrimages across Uttarakhand and Himachal Pradesh — planned by people who live in the mountains.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lots of Trips — Handcrafted Journeys in Uttarakhand & Himachal",
    description:
      "Small-group journeys, treks and pilgrimages across Uttarakhand and Himachal Pradesh — planned by people who live in the mountains.",
  },
};

const INSTAGRAM_REFS = [
  { destination: "manali", index: 1 },
  { destination: "amritsar", index: 1 },
  { destination: "jibhi", index: 0 },
  { destination: "kasol", index: 0 },
  { destination: "shimla", index: 0 },
  { destination: "dharamshala", index: 0 },
];

export default async function HomePage() {
  const destinations = getDestinations();
  const weather = await getWeatherForAll(destinations);
  const statePanels = getStates().map((state) => ({
    ...state,
    image: getStateHeroImage(state.slug),
  }));
  const experienceItems = experiences.map((experience) => ({
    ...experience,
    count: getDestinationsByType(experience.type).length,
    image: resolveImage(experience.image, experience.label),
  }));

  const finderDestinations = destinations.map(({ slug, name, region, state }) => ({ slug, name, region, state }));

  const siteUrl = getSiteUrl();

  const schemas = [
    buildOrganizationSchema(siteUrl),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en-IN",
      publisher: { "@id": organizationId(siteUrl) },
    },
    buildFaqSchema(homeFaqs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <Hero
        slides={heroSlides.map((slide) => ({ caption: slide.caption, image: resolveImage(slide.image, slide.caption) }))}
        destinations={finderDestinations}
      />
      <Manifesto />
      <DestinationMap data={getMapData(weather)} />
      <TwoStates panels={statePanels} />
      <DestinationGallery destinations={destinations} total={destinations.length} weather={weather} />
      <FeaturedTours tours={getFeaturedTours()} />
      <HowItWorks />
      <SeasonStrip destinations={destinations} />
      <ExperienceGrid items={experienceItems} />
      <Testimonials items={getTestimonials()} />
      <InstagramStrip images={INSTAGRAM_REFS.map((ref) => resolveImage(ref, "Lots of Trips on Instagram"))} />
      <FaqSection title="Questions people ask before they book" faqs={homeFaqs} subject="planning a trip with you" />
      <TripPlanner destinations={finderDestinations} />
    </>
  );
}
