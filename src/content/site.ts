import type { NavItem, SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Lots of Trips",
  shortName: "LOT",
  description:
    "Small-group journeys, treks and pilgrimages across Uttarakhand and Himachal Pradesh — planned by people who live in the mountains.",
  url: "https://lots-of-trip.vercel.app",
  established: "2026",
  copyrightYear: 2026,
  contact: {
    phoneDisplay: "+91 70152 48493",
    phoneE164: "+917015248493",
    whatsappNumber: "917015248493",
    email: "info.lotsoftrips@gmail.com",
    address: "Rajpur Road, Dehradun, Uttarakhand 248001",
    hours: "Mon – Sat · 10 am – 7 pm IST · Sunday closed",
  },
  contactFormSrc: "https://forms.daorbit.in/form/6acf292c58e591d396a9d8fa/view",
  social: {
    instagram: {
      handle: "@lotsoftrip_",
      url: "https://www.instagram.com/lotsoftrip_/",
    },
  },
};

export const mainNav: NavItem[] = [
  { label: "Journeys", href: "/tours" },
  { label: "Trip ideas", href: "/trips" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
export const mobileNav: NavItem[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Journeys", href: "/tours" },
  { label: "Trip ideas", href: "/trips" },
  { label: "Uttarakhand", href: "/journeys/uttarakhand" },
  { label: "Himachal Pradesh", href: "/journeys/himachal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const companyNav: NavItem[] = [
  { label: "About us", href: "/about" },
  { label: "Plan a trip", href: "/contact" },
  { label: "Trip finder quiz", href: "/trips#trip-quiz" },
  { label: "All destinations", href: "/destinations" },
  { label: "Photo gallery", href: "/gallery" },
  { label: "Photo credits", href: "/credits" },
];

export const legalNav: NavItem[] = [
  { label: "Cancellation & refunds", href: "/policies/cancellation" },
  { label: "Terms", href: "/policies/terms" },
  { label: "Privacy", href: "/policies/privacy" },
];

export const analytics = {
  trackerSrc: "https://quantalog-be.daorbit.in/tracker.js",
  siteId: "EHU8K8SymLZDnOsT",
};

export const searchVerification = {
  google: "vGqmkgf6XXmC8QRp46nJOYrAncXngiIOPEgt1kEbhDA",
};

export const pricingCopy = {
  label: "Price on request",
  cta: "Get price on WhatsApp",
  short: "Ask for price",
  from: "From",
  perPerson: "per person",
  exactQuote: "Get exact quote",
};

export const quoteAssurance = {
  points: [
    {
      title: "All-inclusive quotes",
      description: "Stays, transport and everything listed as included are in the price. No hidden charges.",
    },
    {
      title: "Free and no obligation",
      description: "Ask for a quote, compare it, walk away if it isn't right. We don't chase.",
    },
    {
      title: "A reply within a few hours",
      description: "On WhatsApp, phone or email — whichever suits you.",
    },
  ],
};

export const bookingStatus = "Now booking winter 2026–27 trips";
