"use client";

import type { Map as LeafletMapInstance, Marker } from "leaflet";
import { useReducedMotion } from "motion/react";
import { useEffect, useEffectEvent, useRef, useState, type RefObject } from "react";
import { MAP_TILES, MAP_ZOOM } from "@/lib/map/config";
import type { MapPlace } from "@/types/map";
import { createPlaceIcon, placeTooltipOptions, type LeafletModule } from "./placeIcon";

export interface LeafletMapOptions {
  places: MapPlace[];
  activeSlug: string;
  zoom: number;
  interactive: boolean;
  onSelect?: (slug: string) => void;
}

export function useLeafletMap(
  containerRef: RefObject<HTMLDivElement | null>,
  { places, activeSlug, zoom, interactive, onSelect }: LeafletMapOptions,
) {
  const [leaflet, setLeaflet] = useState<{ L: LeafletModule; map: LeafletMapInstance } | null>(null);
  const markersRef = useRef(new Map<string, Marker>());
  const initialSlug = useRef(activeSlug);
  const reduceMotion = useReducedMotion();
  const select = useEffectEvent((slug: string) => onSelect?.(slug));

  useEffect(() => {
    const container = containerRef.current;
    const start = places.find((place) => place.slug === initialSlug.current) ?? places[0];
    if (!container || !start) return;

    const markers = markersRef.current;
    let created: LeafletMapInstance | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled) return;
      const map = L.map(container, {
        center: [start.coordinates.lat, start.coordinates.lng],
        zoom,
        minZoom: MAP_ZOOM.min,
        zoomControl: false,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
        boxZoom: interactive,
        keyboard: interactive,
      });
      map.attributionControl.setPrefix(false);
      L.tileLayer(MAP_TILES.url, { attribution: MAP_TILES.attribution, maxZoom: MAP_TILES.maxZoom }).addTo(map);

      places.forEach((place) => {
        const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
          title: place.name,
          alt: place.name,
          interactive,
          keyboard: interactive,
          riseOnHover: true,
        }).addTo(map);
        if (interactive) marker.on("click", () => select(place.slug));
        markers.set(place.slug, marker);
      });

      created = map;
      setLeaflet({ L, map });
    });

    return () => {
      cancelled = true;
      markers.clear();
      created?.remove();
      setLeaflet(null);
    };
  }, [containerRef, places, zoom, interactive]);

  useEffect(() => {
    if (!leaflet) return;
    const { L, map } = leaflet;

    places.forEach((place) => {
      const marker = markersRef.current.get(place.slug);
      if (!marker) return;
      const isActive = place.slug === activeSlug;
      marker.setIcon(createPlaceIcon(L, place.name, isActive));
      marker.setZIndexOffset(isActive ? 1000 : 0);
      marker.unbindTooltip();
      if (interactive && !isActive) marker.bindTooltip(place.name, placeTooltipOptions);
    });

    const active = places.find((place) => place.slug === activeSlug);
    if (active) {
      map.flyTo([active.coordinates.lat, active.coordinates.lng], Math.max(map.getZoom(), zoom), {
        animate: !reduceMotion,
        duration: 0.9,
      });
    }
  }, [leaflet, places, activeSlug, zoom, interactive, reduceMotion]);

  return leaflet?.map ?? null;
}
