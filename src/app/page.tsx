import type { Metadata } from "next";
import { DestinationGallery } from "@/components/sections/home/DestinationGallery";
import { ExperienceGrid } from "@/components/sections/home/ExperienceGrid";
import { FeaturedTours } from "@/components/sections/home/FeaturedTours";
import { Hero } from "@/components/sections/home/Hero";
import { InstagramStrip } from "@/components/sections/home/InstagramStrip";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { SeasonStrip } from "@/components/sections/home/SeasonStrip";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { TwoStates } from "@/components/sections/home/TwoStates";
import { DestinationMap } from "@/components/sections/map/DestinationMap";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { experiences } from "@/content/experiences";
import { heroSlides } from "@/content/hero";
import { siteConfig } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import {
  getDestinations,
  getDestinationsByType,
  getStateHeroImage,
  getStates,
} from "@/lib/data/destinations";
import { resolveImage } from "@/lib/data/images";
import { getMapData } from "@/lib/data/map";
import { getFeaturedTours } from "@/lib/data/tours";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { getWeatherForAll } from "@/lib/weather/getWeather";

export const metadata: Metadata = {
  title: "Lots of Trip — Handcrafted Journeys in Uttarakhand & Himachal",
  description:
    "Tailor-made Himalayan trips, mountain treks, and cultural circuits across Uttarakhand and Himachal Pradesh. Planned by locals in Dehradun with handpicked stays and private transport.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Uttarakhand tour packages",
    "Himachal Pradesh tour packages",
    "Himalayan travel agency",
    "customized mountain trips India",
    "Manali tour package",
    "Shimla Kufri holiday package",
    "Rishikesh river rafting and yoga",
    "Jim Corbett tiger safari",
    "Nainital lake tour",
    "Kasol Kheerganga trek",
    "Jibhi Tirthan homestay",
    "Dharamshala McLeod Ganj itinerary",
    "Amritsar Golden Temple tour",
    "Dehradun tour operator",
  ],
  openGraph: {
    type: "website",
    title: "Lots of Trip — Handcrafted Journeys in Uttarakhand & Himachal",
    description:
      "Small-group journeys, treks and pilgrimages across Uttarakhand and Himachal Pradesh — planned by people who live in the mountains.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lots of Trip — Handcrafted Journeys in Uttarakhand & Himachal",
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

  const siteUrl = getSiteUrl();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: siteUrl,
      logo: `${siteUrl}/logo-dark.png`,
      image: `${siteUrl}/og-image.jpg`,
      description: siteConfig.description,
      telephone: siteConfig.contact.phoneE164,
      email: siteConfig.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rajpur Road",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        postalCode: "248001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 30.3165,
        longitude: 78.0322,
      },
      areaServed: [
        { "@type": "State", name: "Uttarakhand" },
        { "@type": "State", name: "Himachal Pradesh" },
      ],
      sameAs: [siteConfig.social.instagram.url],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en-IN",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <Hero
        slides={heroSlides.map((slide) => ({ caption: slide.caption, image: resolveImage(slide.image, slide.caption) }))}
        destinations={destinations.map(({ slug, name, region, state }) => ({ slug, name, region, state }))}
      />
      <Manifesto />
      <DestinationMap data={getMapData(weather)} />
      <TwoStates panels={statePanels} />
      <DestinationGallery destinations={destinations} total={destinations.length} weather={weather} />
      <FeaturedTours tours={getFeaturedTours()} />
      <SeasonStrip destinations={destinations} />
      <ExperienceGrid items={experienceItems} />
      <Testimonials items={testimonials} />
      <InstagramStrip images={INSTAGRAM_REFS.map((ref) => resolveImage(ref, "Lots of Trip on Instagram"))} />
      <PlanCta image={resolveImage({ destination: "dalhousie", index: 0 }, "Khajjiar meadow, Dalhousie")} />
    </>
  );
}
