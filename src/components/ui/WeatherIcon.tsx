import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { WeatherKind } from "@/types/weather";

const ICONS: Record<WeatherKind, ComponentType<LucideProps>> = {
  clear: Sun,
  "clear-night": Moon,
  "partly-cloudy": CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  showers: CloudRain,
  sleet: CloudHail,
  snow: CloudSnow,
  thunder: CloudLightning,
};

export function WeatherIcon({ kind, ...props }: LucideProps & { kind: WeatherKind }) {
  const Icon = ICONS[kind];
  return <Icon aria-hidden {...props} />;
}
