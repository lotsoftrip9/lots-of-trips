import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { getDestinations, getStates } from "@/lib/data/destinations";
import { getPolicies } from "@/lib/data/guides";
import { getTours } from "@/lib/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  // Core navigation pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/destinations`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tours`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/credits`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic state hub pages (automatically gathered from data)
  const stateRoutes: MetadataRoute.Sitemap = getStates().map((state) => ({
    url: `${siteUrl}/journeys/${state.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic destination pages (automatically gathered from data)
  const destinationRoutes: MetadataRoute.Sitemap = getDestinations().map((destination) => ({
    url: `${siteUrl}/destinations/${destination.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic tour itinerary pages (automatically gathered from data)
  const tourRoutes: MetadataRoute.Sitemap = getTours().map((tour) => ({
    url: `${siteUrl}/tours/${tour.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const policyRoutes: MetadataRoute.Sitemap = getPolicies().map((policy) => ({
    url: `${siteUrl}/policies/${policy.slug}`,
    lastModified: new Date(policy.updated),
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return [...staticRoutes, ...stateRoutes, ...destinationRoutes, ...tourRoutes, ...policyRoutes];
}
