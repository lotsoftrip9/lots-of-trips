import { cacheLife } from "next/cache";
import { siteConfig } from "@/content/site";
import type { Coordinates } from "@/types/destination";
import type { DailyForecast, Weather } from "@/types/weather";
import { describeSymbol } from "./symbols";

const ENDPOINT = "https://api.met.no/weatherapi/locationforecast/2.0/compact";
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const FORECAST_DAYS = 5;

interface MetEntry {
  time: string;
  data: {
    instant: { details: { air_temperature: number; wind_speed?: number } };
    next_1_hours?: { summary: { symbol_code: string } };
    next_6_hours?: { summary: { symbol_code: string } };
    next_12_hours?: { summary: { symbol_code: string } };
  };
}

const symbolOf = (entry: MetEntry) =>
  entry.data.next_1_hours?.summary.symbol_code ??
  entry.data.next_6_hours?.summary.symbol_code ??
  entry.data.next_12_hours?.summary.symbol_code;

function toDaily(entries: MetEntry[]): DailyForecast[] {
  const days = new Map<string, { temps: number[]; noon?: MetEntry; first: MetEntry }>();

  for (const entry of entries) {
    const local = new Date(new Date(entry.time).getTime() + IST_OFFSET_MS);
    const date = local.toISOString().slice(0, 10);
    const day = days.get(date) ?? { temps: [], first: entry };
    day.temps.push(entry.data.instant.details.air_temperature);
    if (!day.noon && local.getUTCHours() >= 11) day.noon = entry;
    days.set(date, day);
  }

  return Array.from(days.entries())
    .slice(0, FORECAST_DAYS)
    .map(([date, day]) => ({
      date,
      min: Math.round(Math.min(...day.temps)),
      max: Math.round(Math.max(...day.temps)),
      ...describeSymbol(symbolOf(day.noon ?? day.first)),
    }));
}

export async function getWeather({ lat, lng }: Coordinates, altitudeM: number): Promise<Weather | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 1800, expire: 86400 });

  try {
    const response = await fetch(`${ENDPOINT}?lat=${lat.toFixed(4)}&lon=${lng.toFixed(4)}&altitude=${Math.round(altitudeM)}`, {
      headers: { "User-Agent": `LotsOfTrip/1.0 (${siteConfig.url}; ${siteConfig.contact.email})` },
    });
    if (!response.ok) return null;

    const json = (await response.json()) as { properties: { meta: { updated_at: string }; timeseries: MetEntry[] } };
    const [now] = json.properties.timeseries;
    if (!now) return null;

    return {
      current: {
        temperature: Math.round(now.data.instant.details.air_temperature),
        windKph: Math.round((now.data.instant.details.wind_speed ?? 0) * 3.6),
        ...describeSymbol(symbolOf(now)),
      },
      daily: toDaily(json.properties.timeseries),
      updatedAt: json.properties.meta.updated_at,
    };
  } catch {
    return null;
  }
}

export async function getWeatherForAll(items: { slug: string; coordinates: Coordinates; altitudeM: number }[]) {
  const results = await Promise.all(items.map((item) => getWeather(item.coordinates, item.altitudeM)));
  return Object.fromEntries(items.map((item, index) => [item.slug, results[index]?.current ?? null]));
}
