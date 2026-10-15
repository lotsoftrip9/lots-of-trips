"use client";

import { ArrowUpRight, CalendarDays, Mountain, Navigation } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pricingCopy } from "@/content/site";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { formatAltitude, formatCoordinates, formatMonthRange } from "@/lib/utils/format";
import { buildDirectionsUrl } from "@/lib/utils/maps";
import { buildPriceEnquiryLink } from "@/lib/utils/whatsapp";
import type { MapPlace } from "@/types/map";

export function MapPlacePanel({ place, className }: { place: MapPlace; className?: string }) {
  const facts = [
    { Icon: Mountain, text: formatAltitude(place.altitudeM) },
    { Icon: CalendarDays, text: formatMonthRange(place.bestMonths) },
  ];

  return (
    <aside
      aria-live="polite"
      className={cn(
        "overflow-hidden rounded-xl bg-snow shadow-[0_24px_60px_rgb(0_0_0/0.22)] ring-1 ring-line",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={place.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: CUBIC.outExpo }}
        >
          <div className="flex gap-4 p-3 md:block md:p-0">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-paper md:aspect-16/9 md:size-auto md:rounded-none">
              <AppImage image={place.image} sizes="(min-width: 768px) 24rem, 5rem" />
            </div>
            <div className="min-w-0 self-center md:px-6 md:pt-5">
              <p className="eyebrow truncate text-saffron">{place.region}</p>
              <h1 className="mt-1 truncate text-[1.375rem] leading-tight font-medium tracking-[-0.02em] md:text-[1.75rem]">
                {place.name}
              </h1>
              <p className="mt-1.5 hidden text-[15px] text-slate md:block">{place.tagline}</p>
            </div>
          </div>

          <div className="px-3 pb-3 md:px-6 md:pb-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line pt-3 text-[13px] text-ink-soft md:mt-5 md:pt-4">
              {facts.map(({ Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="size-3.5 text-slate" aria-hidden />
                  {text}
                </li>
              ))}
              <li className="hidden font-mono text-[12px] text-slate md:block">
                {formatCoordinates(place.coordinates)}
              </li>
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <ButtonLink href={`/destinations/${place.slug}`} className="col-span-2">
                Explore {place.name}
              </ButtonLink>
              <ButtonLink
                href={buildPriceEnquiryLink(place.name)}
                external
                variant="outline"
                icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
              >
                {pricingCopy.short}
              </ButtonLink>
              <ButtonLink
                href={buildDirectionsUrl(place.coordinates)}
                external
                variant="outline"
                icon={<Navigation className="size-3.5" aria-hidden />}
              >
                Directions
                <ArrowUpRight className="size-3.5 text-slate" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
