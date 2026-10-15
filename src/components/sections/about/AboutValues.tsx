import { Headset, Heart, MapPinned, ShieldCheck } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { aboutValues } from "@/content/about";

const ICONS = {
  map: MapPinned,
  shield: ShieldCheck,
  heart: Heart,
  headset: Headset,
};

export function AboutValues() {
  return (
    <section className="bg-paper py-section">
      <div className="container-x">
        <SectionIntro align="center" label="What we stand for" title="Four promises on every trip." />
        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((value) => {
            const Icon = ICONS[value.icon];
            return (
              <RevealItem key={value.title} className="rounded-xl bg-surface p-7">
                <span className="grid size-11 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg tracking-tight">{value.title}</h3>
                <p className="mt-2 text-[15px] text-slate">{value.body}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
