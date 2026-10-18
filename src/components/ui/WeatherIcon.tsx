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
import { cn } from "@/lib/utils/cn";
import type { WeatherKind } from "@/types/weather";
import styles from "./WeatherIcon.module.css";

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

const MOTION: Record<WeatherKind, string> = {
  clear: styles.spin,
  "clear-night": styles.glow,
  "partly-cloudy": styles.drift,
  cloudy: styles.drift,
  fog: styles.drift,
  drizzle: styles.bob,
  rain: styles.bob,
  showers: styles.bob,
  sleet: styles.bob,
  snow: styles.sway,
  thunder: styles.flicker,
};

interface WeatherIconProps extends LucideProps {
  kind: WeatherKind;
  animated?: boolean;
}

export function WeatherIcon({ kind, animated = false, ...props }: WeatherIconProps) {
  const Icon = ICONS[kind];
  if (!animated) return <Icon aria-hidden {...props} />;

  return (
    <span className={cn(styles.animated, MOTION[kind])}>
      <Icon aria-hidden {...props} />
    </span>
  );
}
