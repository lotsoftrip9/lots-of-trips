import type { TripType } from "./destination";
import type { ImageAsset } from "./image";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  established: string;
  copyrightYear: number;
  contact: {
    phoneDisplay: string;
    phoneE164: string;
    whatsappNumber: string;
    email: string;
    address: string;
    hours: string;
  };
  contactFormSrc: string;
  social: {
    instagram: { handle: string; url: string };
  };
}

export interface NavDestinationGroup {
  label: string;
  href: string;
  items: { label: string; href: string; meta: string }[];
}

export interface NavFeature {
  eyebrow: string;
  title: string;
  meta: string;
  href: string;
  image: ImageAsset;
}

export interface HeaderData {
  groups: NavDestinationGroup[];
  feature: NavFeature;
}

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  trip: string;
}

export interface Experience {
  type: TripType;
  label: string;
  description: string;
  image: { destination: string; index: number };
}
