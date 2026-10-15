import { Clock, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmbeddedForm } from "@/components/ui/EmbeddedForm";
import { pricingCopy, siteConfig } from "@/content/site";
import { buildPriceEnquiryLink } from "@/lib/utils/whatsapp";

export function TourEnquiry({ title }: { title: string }) {
  const { contact } = siteConfig;

  return (
    <section id="enquire" className="bg-paper py-section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-saffron">Enquire</p>
          <h2 className="mt-3 text-display-md">Book {title}</h2>
          <p className="mt-4 text-slate">
            Share your dates and group size. We&apos;ll send a tailored quote with hotel options —
            usually within a few hours.
          </p>
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
          <div className="mt-8">
            <ButtonLink
              href={buildPriceEnquiryLink(`the ${title} journey`)}
              external
              variant="outline"
              icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
            >
              {pricingCopy.cta}
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <EmbeddedForm src={siteConfig.contactFormSrc} title={`Enquire about ${title}`} className="bg-surface" />
        </div>
      </div>
    </section>
  );
}
