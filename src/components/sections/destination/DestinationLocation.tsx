import { Expand } from "lucide-react";
import Link from "next/link";
import { LeafletMap } from "@/components/map/LeafletMap";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getMapPlaces } from "@/lib/data/map";
import { MAP_ZOOM } from "@/lib/map/config";
import { formatAltitude, formatCoordinates } from "@/lib/utils/format";
import { destinationMapHref } from "@/lib/utils/maps";
import type { Destination } from "@/types/destination";

export function DestinationLocation({ destination }: { destination: Destination }) {
  const mapHref = destinationMapHref(destination.slug);
  const facts = [
    { label: "Region", value: destination.region },
    { label: "Altitude", value: formatAltitude(destination.altitudeM) },
    { label: "Coordinates", value: formatCoordinates(destination.coordinates) },
  ];

  return (
    <section className="container-x pb-section">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-saffron">Location</p>
          <h2 className="mt-3 text-display-md">Finding {destination.name}</h2>
          <dl className="mt-8 border-t border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="border-b border-line py-4">
                <dt className="text-[12px] font-medium tracking-[0.12em] text-slate uppercase">{fact.label}</dt>
                <dd className="mt-1 text-[16px] font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={mapHref} className="mt-8">
            Open full map
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1} className="order-first lg:order-none lg:col-span-8">
          <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-paper ring-1 ring-line sm:aspect-16/10">
            <LeafletMap
              places={getMapPlaces()}
              activeSlug={destination.slug}
              zoom={MAP_ZOOM.preview}
              label={`Map showing where ${destination.name} is`}
              className="size-full"
            />
            <Link
              href={mapHref}
              aria-label={`Open the full map of ${destination.name}`}
              className="group absolute inset-0 z-10 flex items-start justify-end p-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-snow/90 px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-ink uppercase shadow-[0_6px_18px_rgb(0_0_0/0.14)] backdrop-blur transition-colors group-hover:bg-ink group-hover:text-snow">
                <Expand className="size-3.5" aria-hidden />
                Expand
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
