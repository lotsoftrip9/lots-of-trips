import { Car, Plane, TrainFront, type LucideIcon } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { TravelLeg, TravelMode } from "@/types/guide";

const MODES: Record<TravelMode, { label: string; Icon: LucideIcon; distanceLabel: string }> = {
  air: { label: "By air", Icon: Plane, distanceLabel: "away" },
  rail: { label: "By train", Icon: TrainFront, distanceLabel: "away" },
  road: { label: "By road", Icon: Car, distanceLabel: "drive" },
};

export function GettingThere({ name, legs }: { name: string; legs: TravelLeg[] }) {
  if (!legs.length) return null;

  return (
    <section className="container-x pb-section">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-saffron">Getting there</p>
        <h2 className="mt-3 text-display-md">How to reach {name}</h2>
      </Reveal>
      <Reveal stagger className="mt-10 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
        {legs.map((leg) => {
          const { label, Icon, distanceLabel } = MODES[leg.mode];
          return (
            <RevealItem key={leg.mode} className="flex flex-col bg-paper p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-surface ring-1 ring-line">
                  <Icon className="size-5 text-accent" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="text-[12px] font-medium tracking-[0.12em] text-slate uppercase">{label}</span>
              </div>
              <h3 className="mt-6 text-[17px] leading-snug font-semibold">
                {leg.mode === "road" ? `From ${leg.hub}` : leg.hub}
              </h3>
              <p className="mt-1 text-[14px] font-medium text-accent">
                ~{leg.distanceKm.toLocaleString("en-IN")} km {distanceLabel}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate">{leg.note}</p>
            </RevealItem>
          );
        })}
      </Reveal>
    </section>
  );
}
