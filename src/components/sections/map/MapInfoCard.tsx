"use client";

import { ArrowUpRight, CalendarDays, Mountain } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { WeatherIcon } from "@/components/ui/WeatherIcon";
import { CUBIC } from "@/lib/motion/tokens";
import { formatAltitude, formatMonthRange } from "@/lib/utils/format";
import type { MapDestination } from "@/types/map";

export function MapInfoCard({ destination }: { destination: MapDestination }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/6 ring-1 ring-white/12 backdrop-blur-xl">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={destination.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: CUBIC.outExpo }}
        >
          <div className="relative aspect-16/10 bg-white/5">
            <AppImage image={destination.image} sizes="(min-width: 1024px) 26rem, 100vw" />
            <div className="absolute inset-0 bg-linear-to-t from-[#14120f]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-4">
              <p className="text-[11px] font-medium tracking-[0.2em] text-[#f0d3a0] uppercase">{destination.region}</p>
              <h3 className="mt-1 text-[1.9rem] leading-tight text-white">{destination.name}</h3>
            </div>
          </div>

          <div className="p-5">
            {destination.weather && (
              <div className="flex items-center gap-4 rounded-xl bg-white/6 p-4">
                <WeatherIcon kind={destination.weather.kind} className="size-9 text-[#f0d3a0]" strokeWidth={1.4} />
                <div>
                  <p className="text-[1.75rem] leading-none font-semibold text-white">{destination.weather.temperature}°C</p>
                  <p className="mt-1 text-[13px] text-white/60">{destination.weather.label} right now</p>
                </div>
              </div>
            )}

            <p className="mt-4 text-[15px] text-white/70">{destination.tagline}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-[13px] text-white/70">
              <li className="flex items-center gap-2">
                <Mountain className="size-4 text-white/40" aria-hidden />
                {formatAltitude(destination.altitudeM)}
              </li>
              <li className="flex items-center gap-2 truncate">
                <CalendarDays className="size-4 shrink-0 text-white/40" aria-hidden />
                <span className="truncate">{formatMonthRange(destination.bestMonths)}</span>
              </li>
            </ul>

            <Link
              href={`/destinations/${destination.slug}`}
              className="group mt-5 flex h-12 items-center justify-between rounded-full bg-white pr-2 pl-6 text-[12px] font-medium tracking-[0.16em] text-night uppercase transition-colors hover:bg-[#f0d3a0]"
            >
              Explore {destination.name}
              <span className="grid size-8 place-items-center rounded-full bg-[#14120f] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
