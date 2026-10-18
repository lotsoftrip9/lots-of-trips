import { cn } from "@/lib/utils/cn";
import type { WeatherKind } from "@/types/weather";
import styles from "./WeatherAmbience.module.css";

const AMBIENCE: Record<WeatherKind, string> = {
  clear: styles.clear,
  "clear-night": styles.night,
  "partly-cloudy": styles.cloud,
  cloudy: styles.cloud,
  fog: styles.fog,
  drizzle: styles.rain,
  rain: styles.rain,
  showers: styles.rain,
  sleet: styles.snow,
  snow: styles.snow,
  thunder: styles.thunder,
};

export function WeatherAmbience({ kind }: { kind: WeatherKind }) {
  return <div aria-hidden className={cn(styles.layer, AMBIENCE[kind])} />;
}
