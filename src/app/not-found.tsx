import { ArrowRight, Compass, Home, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getDestinations } from "@/lib/data/destinations";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "404 — Lost on the Trail | Lots of Trip",
  description: "The page you are looking for does not exist or has moved.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  const popularDestinations = getDestinations().slice(0, 6);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-20">
      {/* Explicit noindex meta tag for search engine crawlers */}
      <meta name="robots" content="noindex, nofollow" />

      <div className="container-x relative z-10 max-w-3xl text-center">
        {/* Subtle decorative 404 backdrop badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 ring-1 ring-line ring-inset">
          <Compass className="size-3.5 text-accent animate-spin-slow" aria-hidden />
          <span className="eyebrow text-saffron">404 · Off the Marked Trail</span>
        </div>

        <h1 className="mt-6 text-display-xl tracking-tight text-balance">
          This trail doesn&apos;t lead to a peak.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lead text-slate text-balance">
          The path you followed may have weathered away, moved, or was never mapped.
          Let&apos;s guide you back to familiar terrain.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" icon={<Home className="size-4" />}>
            Back to Basecamp
          </ButtonLink>
          <ButtonLink href="/tours" variant="outline">
            Browse Journeys
          </ButtonLink>
          <ButtonLink
            href={buildWhatsAppLink("help finding my way on Lots of Trip")}
            external
            variant="outline"
            icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
          >
            Ask on WhatsApp
          </ButtonLink>
        </div>

        {/* Quick trail recommendations */}
        <div className="mt-16 rounded-2xl bg-paper p-7 md:p-9 text-left">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-accent" aria-hidden />
            <h2 className="text-[13px] font-semibold tracking-[0.14em] text-slate uppercase">
              Popular places to explore instead
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {popularDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group flex flex-col rounded-xl bg-surface p-3.5 ring-1 ring-line ring-inset transition-all duration-300 hover:shadow-sm hover:ring-ink/20"
              >
                <span className="text-[14px] font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">
                  {dest.name}
                </span>
                <span className="text-[12px] text-slate line-clamp-1">{dest.region}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 border-t border-line pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[13px] text-slate">
            <span>Looking for a personalized Himalayan trip?</span>
            <Link href="/contact" className="group inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
              Plan custom journey
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
