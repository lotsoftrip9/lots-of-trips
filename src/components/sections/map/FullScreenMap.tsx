"use client";

import { useState } from "react";
import { LeafletMap } from "@/components/map/LeafletMap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { MAP_ZOOM } from "@/lib/map/config";
import { destinationMapHref } from "@/lib/utils/maps";
import type { MapPlace } from "@/types/map";
import { MapPlaceChips } from "./MapPlaceChips";
import { MapPlacePanel } from "./MapPlacePanel";
import { MapTopBar } from "./MapTopBar";

export function FullScreenMap({ places, initialSlug }: { places: MapPlace[]; initialSlug: string }) {
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const active = places.find((place) => place.slug === activeSlug) ?? places[0];
  useScrollLock();

  const select = (slug: string) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", destinationMapHref(slug));
  };

  return (
    <div className="fixed inset-0 z-70 flex flex-col bg-snow">
      <MapTopBar place={active} />
      <div className="relative flex-1">
        <LeafletMap
          places={places}
          activeSlug={active.slug}
          zoom={MAP_ZOOM.detail}
          interactive
          onSelect={select}
          label={`Interactive map of ${active.name} and other destinations`}
          className="absolute inset-0"
          controlsClassName="top-16 right-3 md:top-6 md:right-6"
        />
        <MapPlaceChips
          places={places}
          activeSlug={active.slug}
          onSelect={select}
          className="absolute inset-x-2 top-3 z-10 md:right-24 md:left-[calc(24rem+3rem)] md:top-5"
        />
        <MapPlacePanel
          place={active}
          className="absolute inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-10 md:inset-x-auto md:top-6 md:bottom-auto md:left-6 md:w-96"
        />
      </div>
    </div>
  );
}
