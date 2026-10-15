import type { Metadata } from "next";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { TeamGrid } from "@/components/sections/about/TeamGrid";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveImage } from "@/lib/data/images";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "About Us — Himalayan Trip Designers Based in Dehradun",
  description:
    "Learn about Lots of Trip, a Dehradun-based travel company crafting authentic journeys, treks, and cultural trips across Uttarakhand and Himachal Pradesh.",
  keywords: [
    "Lots of Trip",
    "Dehradun travel company",
    "Himalayan travel designers",
    "local tour operators Uttarakhand",
    "mountain travel planners India",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Lots of Trip — Himalayan Travel Specialists",
    description:
      "A Dehradun team planning trips across Uttarakhand and Himachal with trusted local drivers, homestays, and genuine mountain knowledge.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Lots of Trip — Himalayan Travel Specialists",
    description:
      "A Dehradun team planning trips across Uttarakhand and Himachal with trusted local drivers, homestays, and genuine mountain knowledge.",
  },
};

export default function AboutPage() {
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
        name: "About Us",
        item: `${siteUrl}/about`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="About us"
        title={
          <>
            Travel the hills with people who <em>live</em> in them.
          </>
        }
        description="We are a small Dehradun team that plans trips across Uttarakhand and Himachal the way we would want them planned for our own families."
      />
      <AboutStory image={resolveImage({ destination: "mussoorie", index: 0 }, "Mussoorie hills")} />
      <AboutValues />
      <Manifesto />
      <TeamGrid />
      <PlanCta image={resolveImage({ destination: "rishikesh", index: 0 }, "Rishikesh")} />
    </>
  );
}
