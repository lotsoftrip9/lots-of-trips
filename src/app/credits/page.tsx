import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDestinations } from "@/lib/data/destinations";
import { getAllCredits } from "@/lib/data/images";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "Photo Credits & Licences — Lots of Trip",
  description: "Photographer credits, sources, and open licences for imagery across Lots of Trip.",
  alternates: { canonical: "/credits" },
  openGraph: {
    type: "website",
    title: "Photo Credits & Licences — Lots of Trip",
    description: "Photographer credits, sources, and open licences for imagery across Lots of Trip.",
    url: "/credits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Credits & Licences — Lots of Trip",
    description: "Photographer credits, sources, and open licences for imagery across Lots of Trip.",
  },
};

export default function CreditsPage() {
  const names = new Map(getDestinations().map((item) => [item.slug, item.name]));
  const credits = getAllCredits();
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
        name: "Photo Credits",
        item: `${siteUrl}/credits`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Photo credits"
        title="Credits"
        description="Destination photographs are sourced from Wikimedia Commons under open licences. Each is credited below with a link to the original."
      />
      <section className="container-x pb-section">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-paper">
          <ul className="divide-y divide-line">
            {credits.map((credit) => (
              <li key={credit.src} className="grid gap-1 px-6 py-4 text-[14px] sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6">
                <span className="font-medium">{names.get(credit.destination) ?? credit.destination}</span>
                <span className="text-slate">
                  <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                    {credit.title}
                  </a>{" "}
                  by {credit.artist}
                </span>
                <a
                  href={credit.licenseUrl || credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-accent hover:underline"
                >
                  {credit.license}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-8 max-w-4xl text-center text-[13px] text-slate">
          Map boundaries from{" "}
          <a href="https://datameet.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            DataMeet
          </a>{" "}
          (CC BY 2.5 IN). Live weather forecasts from{" "}
          <a href="https://www.met.no/en" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            MET Norway
          </a>{" "}
          (CC BY 4.0).
        </p>
      </section>
    </>
  );
}
