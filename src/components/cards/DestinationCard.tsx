import Link from "next/link";
import { ViewTransition } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { WeatherIcon } from "@/components/ui/WeatherIcon";
import { formatAltitude, tripTypeLabel } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Destination } from "@/types/destination";
import type { CurrentWeather } from "@/types/weather";

interface DestinationCardProps {
  destination: Destination;
  sizes: string;
  className?: string;
  aspect?: "portrait" | "landscape";
  weather?: CurrentWeather | null;
}

export function DestinationCard({ destination, sizes, className, aspect = "portrait", weather }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`} className={cn("group block", className)}>
      <ViewTransition name={`destination-${destination.slug}`} share="morph" default="none">
        <div
          className={cn(
            "relative overflow-hidden rounded-xl bg-paper",
            aspect === "portrait" ? "aspect-4/5" : "aspect-4/3",
          )}
        >
          <AppImage
            image={destination.images[0]}
            sizes={sizes}
            className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
          />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-medium text-black backdrop-blur">
            {formatAltitude(destination.altitudeM)}
          </span>
          {weather && (
            <span
              title={`${weather.label} in ${destination.name} right now`}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur"
            >
              <WeatherIcon kind={weather.kind} className="size-3.5" />
              {weather.temperature}°
            </span>
          )}
        </div>
      </ViewTransition>
      <div className="mt-4 px-1">
        <p className="eyebrow text-saffron">{destination.region}</p>
        <h3 className="mt-2 text-[1.75rem] leading-tight">{destination.name}</h3>
        <p className="mt-1 text-[15px] text-slate">{destination.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {destination.types.slice(0, 2).map((type) => (
            <span key={type} className="rounded-full bg-paper px-2.5 py-0.5 text-[11px] font-medium text-ink-soft ring-1 ring-line ring-inset">
              {tripTypeLabel(type)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
