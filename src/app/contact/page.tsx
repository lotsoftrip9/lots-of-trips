import { Clock, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ContactChannels } from "@/components/sections/contact/ContactChannels";
import { EmbeddedForm } from "@/components/ui/EmbeddedForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/content/site";
import { getSiteUrl } from "@/lib/utils/siteUrl";

const DESCRIPTION =
  "Contact Lots of Trip in Dehradun. Get personalized trip planning for Uttarakhand and Himachal Pradesh — instant WhatsApp assistance, transparent pricing, and local guidance.";

export const metadata: Metadata = {
  title: "Contact & Trip Planner — Lots of Trip",
  description: DESCRIPTION,
  keywords: [
    "contact Lots of Trip",
    "plan Himalayan trip",
    "custom trip planner Uttarakhand",
    "Himachal tour inquiry",
    "Dehradun travel desk",
    "Himalayan travel WhatsApp",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Plan Your Himalayan Journey — Contact Lots of Trip",
    description: DESCRIPTION,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Your Himalayan Journey — Contact Lots of Trip",
    description: DESCRIPTION,
  },
};

const PROMISES = [
  { Icon: Clock, text: "Reply within one working day" },
  { Icon: ShieldCheck, text: "No spam, no mailing list" },
  { Icon: MapPin, text: "Planned by locals in Dehradun" },
];

export default function ContactPage() {
  const { contact } = siteConfig;
  const siteUrl = getSiteUrl();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Lots of Trip",
      description: DESCRIPTION,
      url: `${siteUrl}/contact`,
      mainEntity: {
        "@type": "TravelAgency",
        name: siteConfig.name,
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
          name: "Contact",
          item: `${siteUrl}/contact`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s plan your <em>trip.</em>
          </>
        }
        description="Tell us where you want to go, when, and who's coming along. A real person reads every message — no bots, no call centre."
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {PROMISES.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-[14px] text-slate">
              <Icon className="size-4 shrink-0 text-accent" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="container-x pb-section">
        <div className="mx-auto max-w-3xl">
          <EmbeddedForm src={siteConfig.contactFormSrc} title="Get in touch" eager />
          <p className="mt-5 text-center text-[14px] text-slate">
            Prefer email? Write to{" "}
            <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
              {contact.email}
            </a>{" "}
            — it reaches the same team.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-3xl border-t border-line pt-12">
          <h2 className="text-center text-display-md">Might be faster</h2>
          <div className="mt-8">
            <ContactChannels />
          </div>
          <p className="mt-8 text-center text-[13px] text-slate">{contact.address}</p>
        </div>
      </section>
    </>
  );
}
