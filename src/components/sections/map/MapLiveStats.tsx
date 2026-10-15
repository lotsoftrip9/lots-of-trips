import { Snowflake, Sun } from "lucide-react";
import type { MapDestination } from "@/types/map";

export function MapLiveStats({ destinations }: { destinations: MapDestination[] }) {
  const withWeather = destinations.filter((item) => item.weather);
  if (!withWeather.length) return null;

  const sorted = [...withWeather].sort((a, b) => a.weather!.temperature - b.weather!.temperature);
  const stats = [
    { label: "Coldest now", item: sorted[0], Icon: Snowflake },
    { label: "Warmest now", item: sorted.at(-1)!, Icon: Sun },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
      {stats.map(({ label, item, Icon }) => (
        <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/6 px-4 py-3 ring-1 ring-white/10">
          <Icon className="size-5 text-[#f0d3a0]" aria-hidden />
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">{label}</p>
            <p className="text-[15px] text-white">
              {item.name} <span className="font-semibold text-[#f0d3a0]">{item.weather!.temperature}°C</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
