import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { team } from "@/content/about";
import { FounderPortrait } from "./FounderPortrait";

export function TeamGrid() {
  return (
    <section className="container-x py-section">
      <SectionIntro
        align="center"
        label="The founder"
        title={
          <>
            The person behind <em>every trip.</em>
          </>
        }
      />
      <Reveal stagger className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-10">
        {team.map((member) => (
          <RevealItem key={member.name} className="w-56 text-center sm:w-64">
            <FounderPortrait {...member.photo} />
            <h3 className="mt-5 text-[1.75rem] leading-tight">{member.name}</h3>
            <p className="mt-1 text-[14px] text-slate">{member.role}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
