import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Chevron } from "@/components/ui/ButtonLink";
import { pricingCopy } from "@/content/site";
import { difficultyLabel } from "@/lib/utils/format";
import type { Difficulty, Tour } from "@/types/tour";

const DIFFICULTY_DOT: Record<Difficulty, string> = {
  easy: "bg-[#4caf50]",
  moderate: "bg-[#f59e0b]",
  challenging: "bg-[#ef4444]",
};

export function TourCard({ tour }: { tour: Tour }) {
  const facts = [`${tour.durationDays} days`, tour.groupSize];

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-paper transition-shadow duration-500 hover:shadow-[0_20px_50px_rgb(0_0_0/0.1)]"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <AppImage
          image={tour.cover}
          sizes="(min-width: 768px) 40rem, 100vw"
          className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[12px] font-medium text-ink-soft">
            <span className={`size-2 rounded-full ${DIFFICULTY_DOT[tour.difficulty]}`} aria-hidden />
            {difficultyLabel(tour.difficulty)}
          </span>
          {facts.map((fact) => (
            <span key={fact} className="rounded-full bg-surface px-3 py-1 text-[12px] font-medium text-ink-soft">
              {fact}
            </span>
          ))}
        </div>
        <h3 className="mt-5 text-display-md">{tour.title}</h3>
        <p className="mt-3 text-slate">{tour.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <p className="text-[13px] font-medium tracking-[0.08em] text-slate uppercase">{pricingCopy.label}</p>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
            View itinerary <Chevron />
          </span>
        </div>
      </div>
    </Link>
  );
}
