import { Reveal, RevealItem } from "@/components/motion/Reveal";

const STATS = [
  { value: "13", label: "Destinations we know by heart" },
  { value: "6", label: "Signature journeys" },
  { value: "24×7", label: "On-trip support" },
  { value: "1,200+", label: "Happy travellers" },
];

export function Manifesto() {
  return (
    <section className="container-x py-section text-center">
      <Reveal>
        <p className="eyebrow text-saffron">Who we are</p>
        <p className="mx-auto mt-6 max-w-4xl font-serif-display text-display-md text-balance">
          A small team from Dehradun who believe the Himalaya should be travelled slowly —{" "}
          <span className="text-slate">on foot where possible, with locals always, and never in a hurry.</span>
        </p>
      </Reveal>

      <Reveal stagger className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl bg-line md:mt-20 md:grid-cols-4">
        {STATS.map((stat) => (
          <RevealItem key={stat.label} className="bg-paper px-6 py-8">
            <p className="font-serif-display text-display-md">{stat.value}</p>
            <p className="mt-2 text-[14px] text-slate">{stat.label}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
