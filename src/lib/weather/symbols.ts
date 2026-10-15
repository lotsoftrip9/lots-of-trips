import type { WeatherKind } from "@/types/weather";

const RULES: { test: RegExp; kind: WeatherKind; label: string }[] = [
  { test: /thunder/, kind: "thunder", label: "Thunderstorms" },
  { test: /snow/, kind: "snow", label: "Snow" },
  { test: /sleet/, kind: "sleet", label: "Sleet" },
  { test: /showers/, kind: "showers", label: "Showers" },
  { test: /^lightrain/, kind: "drizzle", label: "Light rain" },
  { test: /rain/, kind: "rain", label: "Rain" },
  { test: /fog/, kind: "fog", label: "Fog" },
  { test: /^cloudy/, kind: "cloudy", label: "Cloudy" },
  { test: /^(partlycloudy|fair)/, kind: "partly-cloudy", label: "Partly cloudy" },
];

export function describeSymbol(symbol: string | undefined): { kind: WeatherKind; label: string } {
  if (!symbol) return { kind: "cloudy", label: "Cloudy" };
  const base = symbol.replace(/_(day|night|polartwilight)$/, "");
  const rule = RULES.find((item) => item.test.test(base));
  if (rule) {
    const label = base.startsWith("light") && rule.kind === "snow" ? "Light snow" : base.startsWith("heavy") ? `Heavy ${rule.label.toLowerCase()}` : rule.label;
    return { kind: rule.kind, label };
  }
  return symbol.endsWith("_night") ? { kind: "clear-night", label: "Clear" } : { kind: "clear", label: "Sunny" };
}
