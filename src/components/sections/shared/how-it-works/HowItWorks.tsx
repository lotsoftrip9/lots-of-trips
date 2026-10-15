import { SectionIntro } from "@/components/ui/SectionIntro";
import { howItWorksCopy, howItWorksSteps } from "@/content/howItWorks";
import { ProcessStepItem } from "./ProcessStepItem";

export function HowItWorks() {
  return (
    <section className="container-x pb-section">
      <SectionIntro
        label={howItWorksCopy.label}
        title={
          <>
            {howItWorksCopy.title} <em>{howItWorksCopy.emphasis}</em>
          </>
        }
      />
      <ol className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:mt-16 lg:grid-cols-4">
        {howItWorksSteps.map((step, index) => (
          <ProcessStepItem key={step.title} step={step} index={index} />
        ))}
      </ol>
    </section>
  );
}
