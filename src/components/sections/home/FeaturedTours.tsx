import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import type { Tour } from "@/types/tour";

export function FeaturedTours({ tours }: { tours: Tour[] }) {
  return (
    <section className="container-x py-section">
      <SectionIntro
        label="Signature journeys"
        title={
          <>
            Itineraries shaped by <em>altitude</em>, season and pace.
          </>
        }
        description="Led by local trip leads, paced for acclimatisation, never more than sixteen travellers."
        action={
          <ButtonLink href="/tours" variant="link">
            All journeys
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <TourGrid tours={tours} />
      </div>
    </section>
  );
}
