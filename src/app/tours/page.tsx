import type { Metadata } from "next";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveImage } from "@/lib/data/images";
import { getTours } from "@/lib/data/tours";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "Himalayan Tour Packages — Curated Trips in Uttarakhand & Himachal",
  description:
    "Private and small-group journeys across Uttarakhand and Himachal — Shimla & Manali, Haridwar & Rishikesh, Nainital & Corbett, Kasol & Jibhi. Custom dates, stays, and transport included.",
  keywords: [
    "Himalayan tour packages",
    "Uttarakhand tour itineraries",
    "Himachal holiday packages",
    "customized road trips Himalayas",
    "private car tour Himalayas",
    "North India mountain packages",
    "Shimla Manali package",
    "Rishikesh Haridwar tour",
  ],
  alternates: { canonical: "/tours" },
  openGraph: {
    type: "website",
    title: "Curated Himalayan Journeys — Lots of Trip",
    description:
      "Handcrafted tours across Uttarakhand and Himachal Pradesh with private drivers, handpicked stays, and local support.",
    url: "/tours",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Himalayan Journeys — Lots of Trip",
    description:
      "Handcrafted tours across Uttarakhand and Himachal Pradesh with private drivers, handpicked stays, and local support.",
  },
};

export default function ToursPage() {
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
        name: "Journeys",
        item: `${siteUrl}/tours`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Journeys"
        title={
          <>
            Itineraries, <em>ready to go.</em>
          </>
        }
        description="Start from one of our tried-and-tested journeys and we will tailor the dates, hotels and pace to you."
      />
      <section className="container-x pb-section">
        <TourGrid tours={getTours()} />
      </section>
      <PlanCta image={resolveImage({ destination: "dharamshala", index: 0 }, "Triund ridge")} />
    </>
  );
}
