import { Reveal } from "@/components/motion/Reveal";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import type { Tour } from "@/types/tour";

export function RelatedTours({ tours }: { tours: Tour[] }) {
  if (!tours.length) return null;

  return (
    <section className="container-x pb-section">
      <Reveal>
        <p className="eyebrow text-saffron">Also consider</p>
        <h2 className="mt-3 text-display-md">Similar journeys</h2>
      </Reveal>
      <div className="mt-8">
        <TourGrid tours={tours} />
      </div>
    </section>
  );
}

