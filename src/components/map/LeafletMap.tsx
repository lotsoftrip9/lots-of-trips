"use client";

import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./LeafletMap.module.css";
import { MapControls } from "./MapControls";
import { useLeafletMap, type LeafletMapOptions } from "./useLeafletMap";

interface LeafletMapProps extends Omit<LeafletMapOptions, "interactive"> {
  label: string;
  interactive?: boolean;
  className?: string;
  controlsClassName?: string;
}

export function LeafletMap({ label, interactive = false, className, controlsClassName, ...options }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const map = useLeafletMap(containerRef, { ...options, interactive });
  const active = options.places.find((place) => place.slug === options.activeSlug);

  return (
    <div className={cn("relative isolate", className)}>
      <div ref={containerRef} role="region" aria-label={label} className={cn(styles.map, "size-full")} />
      {interactive && map && active && (
        <MapControls
          map={map}
          focus={active.coordinates}
          places={options.places}
          className={cn("absolute z-1000", controlsClassName)}
        />
      )}
    </div>
  );
}
