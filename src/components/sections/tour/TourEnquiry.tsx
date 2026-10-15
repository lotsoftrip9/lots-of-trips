import { Clock, Phone } from "lucide-react";
import { QuoteAssurance } from "@/components/sections/shared/QuoteAssurance";
import { EmbeddedForm } from "@/components/ui/EmbeddedForm";
import { quoteBuilderCopy } from "@/content/quoteBuilder";
import { siteConfig } from "@/content/site";
import type { Tour } from "@/types/tour";
import { ItineraryDownload } from "./ItineraryDownload";
import { TourQuoteBuilder } from "./quote-builder/TourQuoteBuilder";

type TourEnquiryProps = Pick<Tour, "slug" | "title" | "durationDays" | "bestMonths">;

export function TourEnquiry({ slug, title, durationDays, bestMonths }: TourEnquiryProps) {
  const { contact } = siteConfig;

  return (
    <section id="enquire" className="bg-paper py-section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="eyebrow text-saffron">Enquire</p>
          <h2 className="mt-3 text-display-md">Book {title}</h2>
          <p className="mt-4 text-slate">
            Share your dates and group size, and we&apos;ll send a tailored quote with hotel options.
          </p>
          <QuoteAssurance className="mt-7" />
          <ul className="mt-8 space-y-3 text-[15px]">
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-accent" aria-hidden />
              <a href={`tel:${contact.phoneE164}`} className="hover:text-accent">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3 text-slate">
              <Clock className="size-4 text-accent" aria-hidden />
              {contact.hours}
            </li>
          </ul>
          <ItineraryDownload slug={slug} title={title} className="mt-8" />
        </div>
        <div className="lg:col-span-7">
          <TourQuoteBuilder tourTitle={title} durationDays={durationDays} bestMonths={bestMonths} />
          <p className="my-8 flex items-center gap-4 text-[13px] text-slate before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
            {quoteBuilderCopy.formDivider}
          </p>
          <EmbeddedForm src={siteConfig.contactFormSrc} title={`Enquire about ${title}`} className="bg-surface" />
        </div>
      </div>
    </section>
  );
}
