import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import type { ResolvedItineraryDay } from "@/types/tour";

export function Itinerary({ days }: { days: ResolvedItineraryDay[] }) {
  return (
    <section className="container-x py-section">
      <p className="eyebrow text-saffron">Day by day</p>
      <h2 className="mt-3 text-display-md">The itinerary</h2>
      <ol className="mt-10 space-y-5 border-l border-line pl-6 md:pl-10">
        {days.map((day) => (
          <li key={day.day} className="relative">
            <span className="absolute top-7 left-[-1.9rem] size-3 rounded-full bg-accent ring-4 ring-snow md:left-[-2.9rem]" />
            <Reveal className="grid gap-5 rounded-xl bg-paper p-5 sm:grid-cols-[1fr_14rem] md:p-6">
              <div>
                <p className="text-[13px] font-semibold text-accent">Day {day.day}</p>
                <h3 className="mt-1 text-xl tracking-tight">{day.title}</h3>
                <p className="mt-2 text-[15px] text-slate">{day.description}</p>
              </div>
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-32">
                <AppImage image={day.image} sizes="(min-width: 640px) 14rem, 100vw" />
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
