"use client";

import { useRouter } from "next/navigation";
import { useId, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils/cn";
import type { MapData } from "@/types/map";
import styles from "./DestinationMap.module.css";
import { MapPinLabel } from "./MapPinLabel";

interface MapCanvasProps {
  data: MapData;
  active: string;
  onActivate: (slug: string) => void;
}

export function MapCanvas({ data, active, onActivate }: MapCanvasProps) {
  const router = useRouter();
  const patternId = useId();
  const open = (slug: string) => router.push(`/destinations/${slug}`);

  const onKey = (event: KeyboardEvent<SVGGElement>, slug: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open(slug);
    }
  };

  const ordered = [...data.destinations].sort((a, b) => Number(a.slug === active) - Number(b.slug === active));

  return (
    <svg
      viewBox={`0 0 ${data.width} ${data.height}`}
      role="group"
      aria-label="Map of destinations in Uttarakhand and Himachal Pradesh with live temperatures"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <pattern id={patternId} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" className={styles.gridDot} />
        </pattern>
      </defs>
      <rect width={data.width} height={data.height} fill={`url(#${patternId})`} />

      {data.states.map((state) => (
        <path
          key={state.key}
          d={state.path}
          className={cn(styles.state, state.focus ? styles.stateFocus : styles.stateMuted)}
        />
      ))}

      {data.labels.map((label) => (
        <text key={label.text} x={label.x} y={label.y} textAnchor="middle" className={styles.stateLabel}>
          {label.text.toUpperCase()}
        </text>
      ))}

      {ordered.map((item) => {
        const isActive = item.slug === active;
        return (
          <g
            key={item.slug}
            role="link"
            tabIndex={0}
            aria-label={`${item.name}, ${item.region}${item.weather ? `, ${item.weather.temperature} degrees, ${item.weather.label}` : ""}`}
            transform={`translate(${item.x} ${item.y})`}
            onMouseEnter={() => onActivate(item.slug)}
            onFocus={() => onActivate(item.slug)}
            onClick={() => (isActive ? open(item.slug) : onActivate(item.slug))}
            onKeyDown={(event) => onKey(event, item.slug)}
            className={styles.pin}
            data-active={isActive || undefined}
          >
            <circle r={24} className={styles.pinHit} />
            <circle r={14} className={styles.pinGlow} />
            {isActive && <circle r={9} className={styles.pinPulse} />}
            <circle r={isActive ? 8 : 5.5} className={styles.pinDot} />
            <MapPinLabel destination={item} active={isActive} />
          </g>
        );
      })}
    </svg>
  );
}
