import { TourCard } from "@/components/cards/TourCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { Tour } from "@/types/tour";

export function TourGrid({ tours }: { tours: Tour[] }) {
  return (
    <Reveal stagger className="grid gap-6 md:grid-cols-2">
      {tours.map((tour) => (
        <RevealItem key={tour.slug}>
          <TourCard tour={tour} />
        </RevealItem>
      ))}
    </Reveal>
  );
}
