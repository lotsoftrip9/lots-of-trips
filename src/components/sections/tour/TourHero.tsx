import { ArrowUpRight, CalendarDays, Gauge, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { pricingCopy } from "@/content/site";
import { cn } from "@/lib/utils/cn";
import { difficultyLabel } from "@/lib/utils/format";
import { buildPriceEnquiryLink } from "@/lib/utils/whatsapp";
import type { Tour } from "@/types/tour";

export function TourHero({ tour, places }: { tour: Tour; places: string[] }) {
  const facts = [
    { Icon: CalendarDays, label: "Duration", value: `${tour.durationDays} days` },
    { Icon: Gauge, label: "Level", value: difficultyLabel(tour.difficulty) },
    { Icon: Users, label: "Group", value: tour.groupSize },
  ];

  return (
    <section className="container-x pt-14 md:pt-20">
      <Reveal onLoad className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-saffron">{places.join(" · ")}</p>
        <h1 className="mt-3 text-display-xl">{tour.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lead text-slate">{tour.summary}</p>
      </Reveal>

      <div className="relative mt-12 aspect-4/3 overflow-hidden rounded-xl bg-paper sm:aspect-16/9 md:mt-16 lg:aspect-21/9">
        <AppImage image={tour.cover} sizes="(min-width: 1312px) 1216px, 100vw" preload />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line md:grid-cols-4">
        {facts.map(({ Icon, label, value }, index) => (
          <div
            key={label}
            className={cn("flex items-center gap-3 bg-paper px-5 py-5", index === facts.length - 1 && "col-span-2 md:col-span-1")}
          >
            <Icon className="size-5 shrink-0 text-accent" aria-hidden />
            <div>
              <dt className="text-[12px] text-slate">{label}</dt>
              <dd className="text-[15px] font-semibold">{value}</dd>
            </div>
          </div>
        ))}
        <div className="col-span-2 bg-paper md:col-span-1">
          <dt className="sr-only">Price</dt>
          <dd className="h-full">
            <a
              href={buildPriceEnquiryLink(`the ${tour.title} journey`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-3 px-5 py-5 transition-colors hover:bg-surface"
            >
              <FaWhatsapp className="size-5 shrink-0 text-[#25d366]" aria-hidden />
              <span className="flex-1">
                <span className="block text-[12px] text-slate">{pricingCopy.label}</span>
                <span className="block text-[15px] font-semibold">{pricingCopy.short}</span>
              </span>
              <ArrowUpRight
                className="size-4 text-slate transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
