import { buildDestinationFaqs, tourFaqs } from "@/content/faqs";
import { gettingThere } from "@/content/gettingThere";
import { policies } from "@/content/policies";
import type { Destination } from "@/types/destination";

export const getGettingThere = (slug: string) => gettingThere[slug] ?? [];

export const getDestinationFaqs = (destination: Destination) =>
  buildDestinationFaqs(destination, getGettingThere(destination.slug));

export const getTourFaqs = () => tourFaqs;

export const getPolicies = () => policies;

export const getPolicy = (slug: string) => policies.find((policy) => policy.slug === slug);
