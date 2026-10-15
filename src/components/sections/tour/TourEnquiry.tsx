import { Reveal } from "@/components/motion/Reveal";
import { quoteBuilderCopy } from "@/content/quoteBuilder";
import type { Tour } from "@/types/tour";
import { TourPlanner } from "./quote-builder/TourPlanner";

interface TourEnquiryProps {
  tour: Pick<Tour, "slug" | "title" | "durationDays" | "bestMonths" | "cover">;
  places: string[];
}

export function TourEnquiry({ tour, places }: TourEnquiryProps) {
  return (
    <section id="enquire" className="bg-paper py-section">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-saffron">{quoteBuilderCopy.eyebrow}</p>
          <h2 className="mt-3 text-display-md">
            Make <em>{tour.title}</em> yours.
          </h2>
          <p className="mt-4 text-lead text-slate">{quoteBuilderCopy.intro}</p>
        </Reveal>
        <TourPlanner
          slug={tour.slug}
          title={tour.title}
          durationDays={tour.durationDays}
          bestMonths={tour.bestMonths}
          places={places}
          cover={tour.cover}
        />
      </div>
    </section>
  );
}
