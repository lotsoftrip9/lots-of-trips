import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { StatePanelData } from "./StatePanel";
import { StatePanel } from "./StatePanel";

export function TwoStates({ panels }: { panels: StatePanelData[] }) {
  return (
    <section aria-label="Two states" className="bg-paper py-section">
      <div className="container-x">
        <SectionIntro
          align="center"
          label="Two states"
          title={
            <>
              One range. <em>Two worlds.</em>
            </>
          }
          description="Temple towns and alpine meadows in Uttarakhand. Cold deserts and cedar valleys in Himachal. We plan both, end to end."
        />
        <Reveal stagger className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2">
          {panels.map((panel) => (
            <RevealItem key={panel.slug}>
              <StatePanel panel={panel} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
