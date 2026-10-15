import type { Coordinates, StateSlug, TripType } from "@/types/destination";
import type { Difficulty } from "@/types/tour";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const monthShort = (month: number) => MONTHS[month - 1].slice(0, 3);

const numberFormat = new Intl.NumberFormat("en-IN");

export const formatAltitude = (metres: number) => `${numberFormat.format(metres)} m`;

export function formatCoordinates({ lat, lng }: Coordinates) {
  const latLabel = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`;
  const lngLabel = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;
  return `${latLabel} · ${lngLabel}`;
}

export const padIndex = (index: number) => String(index + 1).padStart(2, "0");

const TRIP_TYPE_LABELS: Record<TripType, string> = {
  trek: "Trek",
  pilgrimage: "Pilgrimage",
  snow: "Snow",
  wildlife: "Wildlife",
  "hill-station": "Hill station",
  offbeat: "Offbeat",
  adventure: "Adventure",
  culture: "Culture",
  lakes: "Lakes",
};

export const tripTypeLabel = (type: TripType) => TRIP_TYPE_LABELS[type];

const STATE_LABELS: Record<StateSlug, string> = {
  uttarakhand: "Uttarakhand",
  himachal: "Himachal Pradesh",
};

export const stateLabel = (state: StateSlug) => STATE_LABELS[state];

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  moderate: "Moderate",
  challenging: "Challenging",
};

export const difficultyLabel = (difficulty: Difficulty) => DIFFICULTY_LABELS[difficulty];

export function formatMonthRange(months: number[]) {
  if (!months.length) return "";
  if (months.length === 12) return "All year";
  return months.map(monthShort).join(" · ");
}

export function formatMonthList(months: number[]) {
  const names = months.map((month) => MONTHS[month - 1]);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

export const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;
