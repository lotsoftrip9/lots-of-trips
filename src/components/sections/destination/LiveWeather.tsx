import { Wind } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { WeatherIcon } from "@/components/ui/WeatherIcon";
import { getWeather } from "@/lib/weather/getWeather";
import type { Destination } from "@/types/destination";

const weekday = new Intl.DateTimeFormat("en-IN", { weekday: "short", timeZone: "UTC" });

export async function LiveWeather({ destination }: { destination: Destination }) {
  const weather = await getWeather(destination.coordinates, destination.altitudeM);
  if (!weather) return null;

  const { current, daily } = weather;

  return (
    <section className="container-x pb-section">
      <Reveal className="grid overflow-hidden rounded-xl bg-night text-white md:grid-cols-12">
        <div className="p-7 md:col-span-5 md:p-10">
          <p className="flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] text-[#f0d3a0] uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#f0d3a0] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#f0d3a0]" />
            </span>
            Live weather
          </p>
          <h2 className="mt-3 text-display-md">Right now in {destination.name}</h2>
          <div className="mt-8 flex items-center gap-5">
            <WeatherIcon kind={current.kind} className="size-14 text-[#f0d3a0]" strokeWidth={1.4} />
            <div>
              <p className="text-display-lg leading-none font-medium">{current.temperature}°C</p>
              <p className="mt-2 text-white/70">{current.label}</p>
            </div>
          </div>
          <p className="mt-6 flex items-center gap-2 text-[14px] text-white/60">
            <Wind className="size-4" aria-hidden />
            Wind {current.windKph} km/h
          </p>
        </div>

        <div className="border-t border-white/10 p-7 md:col-span-7 md:border-t-0 md:border-l md:p-10">
          <p className="text-[12px] font-medium tracking-[0.18em] text-white/50 uppercase">Next {daily.length} days</p>
          <ol className="mt-5 grid grid-cols-5 gap-2">
            {daily.map((day, index) => (
              <li key={day.date} className="flex flex-col items-center gap-2 rounded-lg bg-white/5 px-1 py-4 text-center">
                <span className="text-[12px] font-medium text-white/70">
                  {index === 0 ? "Today" : weekday.format(new Date(`${day.date}T00:00:00Z`))}
                </span>
                <WeatherIcon kind={day.kind} className="size-6 text-[#f0d3a0]" strokeWidth={1.5} />
                <span className="text-[14px] font-semibold">{day.max}°</span>
                <span className="text-[12px] text-white/50">{day.min}°</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[11px] text-white/40">
            Forecast data from{" "}
            <a href="https://www.met.no/en" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              MET Norway
            </a>{" "}
            · updates every 30 minutes
          </p>
        </div>
      </Reveal>
    </section>
  );
}
