"use client";

import type { Map as LeafletMapInstance } from "leaflet";
import { LocateFixed, Minus, Plus, Scan } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { MAP_OVERVIEW_PADDING, MAP_ZOOM } from "@/lib/map/config";
import { cn } from "@/lib/utils/cn";
import type { Coordinates } from "@/types/destination";
import type { MapPlace } from "@/types/map";

interface MapControlsProps {
  map: LeafletMapInstance;
  focus: Coordinates;
  places: MapPlace[];
  className?: string;
}

const BUTTON =
  "grid size-11 place-items-center text-ink transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const GROUP = "flex flex-col overflow-hidden rounded-full bg-snow shadow-[0_8px_24px_rgb(0_0_0/0.14)] ring-1 ring-line";

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={BUTTON}>
      {children}
    </button>
  );
}

export function MapControls({ map, focus, places, className }: MapControlsProps) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const recenter = () => map.flyTo([focus.lat, focus.lng], MAP_ZOOM.detail, { animate, duration: 0.9 });
  const showAll = () =>
    map.flyToBounds(
      places.map((place) => [place.coordinates.lat, place.coordinates.lng]),
      { padding: MAP_OVERVIEW_PADDING, animate, duration: 1.1 },
    );

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className={cn(GROUP, "divide-y divide-line")}>
        <ControlButton label="Zoom in" onClick={() => map.zoomIn()}>
          <Plus className="size-4.5" aria-hidden />
        </ControlButton>
        <ControlButton label="Zoom out" onClick={() => map.zoomOut()}>
          <Minus className="size-4.5" aria-hidden />
        </ControlButton>
      </div>
      <div className={cn(GROUP, "divide-y divide-line")}>
        <ControlButton label="Recenter" onClick={recenter}>
          <LocateFixed className="size-4.5" aria-hidden />
        </ControlButton>
        <ControlButton label="Show all destinations" onClick={showAll}>
          <Scan className="size-4.5" aria-hidden />
        </ControlButton>
      </div>
    </div>
  );
}
