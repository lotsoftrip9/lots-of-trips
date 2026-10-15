"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";
import type { MapData } from "@/types/map";
import { MapCanvas } from "./MapCanvas";
import { MapInfoCard } from "./MapInfoCard";
import { MapLiveStats } from "./MapLiveStats";

export function DestinationMap({ data }: { data: MapData }) {
  const [active, setActive] = useState(data.destinations[0].slug);
  const activeDestination = data.destinations.find((item) => item.slug === active) ?? data.destinations[0];
  const hasWeather = data.destinations.some((item) => item.weather);

  return (
    <section className="relative overflow-hidden bg-night py-section text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-144 w-240 -translate-x-1/2 rounded-full bg-[#f0d3a0]/10 blur-[140px]" />

      <div className="relative container-x">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {hasWeather && (
              <p className="flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] text-[#f0d3a0] uppercase">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#f0d3a0] opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#f0d3a0]" />
                </span>
                Live map · updated every 30 min
              </p>
            )}
            <h2 className="mt-4 text-display-lg">
              The hills, <em className="text-[#f0d3a0]">right now.</em>
            </h2>
            <p className="mt-5 text-lead text-white/60">
              All {data.destinations.length} destinations with live temperatures. Hover or tap a pin to preview —
              tap again to open it.
            </p>
          </div>
          <MapLiveStats destinations={data.destinations} />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-center">
          <Reveal className="rounded-3xl bg-white/2 p-3 ring-1 ring-white/10 sm:p-6 lg:col-span-8">
            <MapCanvas data={data} active={active} onActivate={setActive} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <MapInfoCard destination={activeDestination} />
          </Reveal>
        </div>

        <div className="-mx-gutter mt-8 flex gap-2 overflow-x-auto px-gutter pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0" role="tablist" aria-label="Destinations">
          {data.destinations.map((item) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={item.slug === active}
              onClick={() => setActive(item.slug)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium ring-1 ring-inset transition-colors",
                item.slug === active
                  ? "bg-[#f0d3a0] text-night ring-[#f0d3a0]"
                  : "text-white/70 ring-white/15 hover:text-white hover:ring-white/30",
              )}
            >
              {item.name}
              {item.weather && (
                <span className={item.slug === active ? "font-semibold" : "font-semibold text-[#f0d3a0]"}>
                  {item.weather.temperature}°
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
