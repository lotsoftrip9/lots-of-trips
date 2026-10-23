import { team } from "@/content/about";
import { siteConfig } from "@/content/site";
import type { Faq } from "@/types/guide";

export const organizationId = (siteUrl: string) => `${siteUrl}/#organization`;

export function buildFaqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function buildOrganizationSchema(siteUrl: string) {
  const { contact } = siteConfig;
  const [founder] = team;

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": organizationId(siteUrl),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    description: siteConfig.description,
    telephone: contact.phoneE164,
    email: contact.email,
    foundingDate: siteConfig.established,
    founder: { "@type": "Person", name: founder.name, jobTitle: founder.role, image: `${siteUrl}${founder.photo.src}` },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rajpur Road",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      postalCode: "248001",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 30.3165, longitude: 78.0322 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: contact.openingHours.days,
      opens: contact.openingHours.opens,
      closes: contact.openingHours.closes,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phoneE164,
      email: contact.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    areaServed: [
      { "@type": "State", name: "Uttarakhand" },
      { "@type": "State", name: "Himachal Pradesh" },
      { "@type": "State", name: "Punjab" },
    ],
    knowsAbout: [
      "Uttarakhand tour packages",
      "Himachal Pradesh tour packages",
      "Haridwar Ganga Aarti and Golden Temple pilgrimages",
      "Jim Corbett jungle safari",
      "Himalayan treks",
      "Snow trips to Manali and Shimla",
    ],
    sameAs: [siteConfig.social.instagram.url],
  };
}
