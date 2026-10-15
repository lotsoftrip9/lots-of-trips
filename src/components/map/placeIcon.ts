import type { DivIcon } from "leaflet";
import styles from "./LeafletMap.module.css";

export type LeafletModule = typeof import("leaflet");

const PIN_SIZE = { active: 22, idle: 14 };

export function createPlaceIcon(L: LeafletModule, name: string, active: boolean): DivIcon {
  const size = active ? PIN_SIZE.active : PIN_SIZE.idle;
  return L.divIcon({
    className: active ? styles.pinActive : styles.pin,
    html: active ? `<span class="${styles.pulse}"></span><span class="${styles.label}">${name}</span>` : "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export const placeTooltipOptions = {
  direction: "top" as const,
  offset: [0, -10] as [number, number],
  className: styles.tooltip,
};
