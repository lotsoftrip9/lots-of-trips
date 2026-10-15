import { ChevronRight, MapIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pricingCopy } from "@/content/site";
import { formatAltitude, formatMonthRange, stateLabel, tripTypeLabel } from "@/lib/utils/format";
import { destinationMapHref } from "@/lib/utils/maps";
import { buildPriceEnquiryLink } from "@/lib/utils/whatsapp";
import type { Destination } from "@/types/destination";
import styles from "./DestinationHero.module.css";
import { HeroPhotoStrip } from "./HeroPhotoStrip";

export function DestinationHero({ destination }: { destination: Destination }) {
  const facts = [
    { label: "Altitude", value: formatAltitude(destination.altitudeM) },
    { label: "Good for", value: destination.types.map(tripTypeLabel).join(", ") },
    { label: "Best time", value: formatMonthRange(destination.bestMonths) },
  ];

  return (
    <section data-header-overlay className="relative isolate flex min-h-152 flex-col overflow-hidden bg-night text-white md:h-[92svh] md:max-h-256">
      <ViewTransition name={`destination-${destination.slug}`} share="morph" default="none">
        <div className="absolute inset-0 -z-10">
          <AppImage
            image={destination.images[0]}
            sizes="100vw"
            preload
            className={styles.image}
          />
        </div>
      </ViewTransition>
      <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-linear-to-t from-black/85 via-black/40 to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pt-32 pb-8 md:pb-12">
        <Reveal onLoad className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-white/70">
              <Link href="/destinations" className="transition-colors hover:text-white">
                Destinations
              </Link>
              <ChevronRight className="size-3.5" aria-hidden />
              <Link href={`/journeys/${destination.state}`} className="transition-colors hover:text-white">
                {stateLabel(destination.state)}
              </Link>
            </nav>
            <h1 className="mt-4 text-display-2xl">{destination.name}</h1>
            <p className="mt-4 max-w-xl text-lead text-white/85">{destination.tagline}</p>
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <ButtonLink
                href={buildPriceEnquiryLink(`a trip to ${destination.name}`)}
                external
                variant="light"
                icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
              >
                <span className="sm:hidden">{pricingCopy.short}</span>
                <span className="hidden sm:inline">{pricingCopy.cta}</span>
              </ButtonLink>
              <ButtonLink href={destinationMapHref(destination.slug)} variant="glass" icon={<MapIcon className="size-4" aria-hidden />}>
                View on map
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl bg-black/30 p-5 ring-1 ring-white/15 backdrop-blur-xl ring-inset md:p-6">
              <p className="text-[11px] font-medium tracking-[0.18em] text-accent-light uppercase">
                {destination.region}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                {facts.map((fact, index) => (
                  <div key={fact.label} className={index === facts.length - 1 ? "col-span-2" : undefined}>
                    <dt className="text-[12px] text-white/60">{fact.label}</dt>
                    <dd className="mt-0.5 text-[15px] font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {destination.images.length > 1 && (
                <div className="mt-5 border-t border-white/15 pt-5">
                  <HeroPhotoStrip images={destination.images} />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
