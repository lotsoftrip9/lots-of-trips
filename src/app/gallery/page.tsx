import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryExplorer } from "@/components/sections/gallery/GalleryExplorer";
import { GalleryGrid } from "@/components/sections/gallery/GalleryGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { getGalleryPhotos } from "@/lib/data/gallery";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "Photo Gallery — Uttarakhand & Himachal Pradesh",
  description:
    "Browse photos from every destination across Uttarakhand and Himachal Pradesh, filterable by location — Shimla, Manali, Rishikesh, Nainital, Jim Corbett and more.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    title: "Photo Gallery — Uttarakhand & Himachal Pradesh",
    description:
      "Browse photos from every destination across Uttarakhand and Himachal Pradesh, filterable by location.",
    url: "/gallery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery — Uttarakhand & Himachal Pradesh",
    description:
      "Browse photos from every destination across Uttarakhand and Himachal Pradesh, filterable by location.",
  },
};

export default function GalleryPage() {
  const photos = getGalleryPhotos();
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
        name: "Gallery",
        item: `${siteUrl}/gallery`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <Suspense fallback={<GalleryGrid photos={photos} />}>
          <GalleryExplorer photos={photos} />
        </Suspense>
      </section>
    </>
  );
}
