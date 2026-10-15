import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ShareButton } from "@/components/ui/ShareButton";
import { pricingCopy } from "@/content/site";
import { formatAltitude, formatMonthRange, tripTypeLabel } from "@/lib/utils/format";
import { buildPriceEnquiryLink } from "@/lib/utils/whatsapp";
import type { Destination } from "@/types/destination";

export function DestinationOverview({ destination }: { destination: Destination }) {
  const facts = [
    { label: "Region", value: destination.region },
    { label: "Altitude", value: formatAltitude(destination.altitudeM) },
    { label: "Best time", value: formatMonthRange(destination.bestMonths) },
    { label: "Good for", value: destination.types.map(tripTypeLabel).join(", ") },
  ];

  return (
    <section className="container-x py-section">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-saffron">Overview</p>
          <h2 className="mt-3 text-display-md">About {destination.name}</h2>
          <p className="mt-6 text-lead text-ink-soft">{destination.description}</p>

          <h3 className="mt-14 text-[13px] font-semibold tracking-[0.12em] text-slate uppercase">Highlights</h3>
          <ol className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {destination.highlights.map((highlight, index) => (
              <li key={highlight} className="flex gap-5 border-t border-line py-5">
                <span className="pt-0.5 text-[13px] font-semibold text-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] leading-snug">{highlight}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-xl bg-paper p-7 md:p-9 lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
            <h3 className="text-[13px] font-semibold tracking-[0.12em] text-slate uppercase">At a glance</h3>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-6 py-3.5 text-[14px]">
                  <dt className="shrink-0 text-slate">{fact.label}</dt>
                  <dd className="text-right font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex items-baseline justify-between gap-4">
              <p className="text-[13px] text-slate">Trips to {destination.name}</p>
              <p className="text-[15px] font-semibold">{pricingCopy.label}</p>
            </div>

            <div className="mt-5 grid gap-2.5">
              <ButtonLink
                href={buildPriceEnquiryLink(`a trip to ${destination.name}`)}
                external
                icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
              >
                {pricingCopy.cta}
              </ButtonLink>
              <div className="grid grid-cols-2 gap-2.5">
                <ButtonLink href="/contact" variant="outline">
                  Plan a trip
                </ButtonLink>
                <ShareButton title={destination.name} text={destination.tagline} label="Share" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
