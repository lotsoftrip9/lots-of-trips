import mapSource from "@/content/generated/map.json";
import { mapLabelSides } from "@/content/mapLabels";
import type { Coordinates } from "@/types/destination";
import type { MapData, MapPlace, MapState } from "@/types/map";
import type { CurrentWeather } from "@/types/weather";
import { getDestinations } from "./destinations";

const { projection } = mapSource;

const STATE_LABELS: { text: string; coordinates: Coordinates }[] = [
  { text: "Himachal Pradesh", coordinates: { lat: 32.85, lng: 77.75 } },
  { text: "Uttarakhand", coordinates: { lat: 30.35, lng: 79.9 } },
  { text: "Punjab", coordinates: { lat: 30.55, lng: 75.2 } },
];

function project({ lat, lng }: Coordinates) {
  return {
    x: Math.round((lng - projection.minLon) * projection.cosMidLat * projection.scale * 10) / 10,
    y: Math.round((projection.maxLat - lat) * projection.scale * 10) / 10,
  };
}

export function getMapData(weather: Record<string, CurrentWeather | null>): MapData {
  return {
    width: mapSource.width,
    height: mapSource.height,
    states: mapSource.states as MapState[],
    labels: STATE_LABELS.map((label) => ({ text: label.text, ...project(label.coordinates) })),
    destinations: getDestinations().map((destination) => ({
      slug: destination.slug,
      name: destination.name,
      region: destination.region,
      state: destination.state,
      tagline: destination.tagline,
      altitudeM: destination.altitudeM,
      bestMonths: destination.bestMonths,
      image: destination.images[0],
      weather: weather[destination.slug] ?? null,
      labelSide: mapLabelSides[destination.slug] ?? "right",
      ...project(destination.coordinates),
    })),
  };
}

export function getMapPlaces(): MapPlace[] {
  return getDestinations().map((destination) => ({
    slug: destination.slug,
    name: destination.name,
    region: destination.region,
    tagline: destination.tagline,
    altitudeM: destination.altitudeM,
    bestMonths: destination.bestMonths,
    coordinates: destination.coordinates,
    image: destination.images[0],
  }));
}
