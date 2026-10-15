import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FaqList } from "@/components/ui/FaqList";
import { faqCopy } from "@/content/faqs";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { Faq } from "@/types/guide";

interface FaqSectionProps {
  title: string;
  faqs: Faq[];
  subject: string;
}

export function FaqSection({ title, faqs, subject }: FaqSectionProps) {
  return (
    <section className="container-x pb-section">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-saffron">{faqCopy.eyebrow}</p>
          <h2 className="mt-3 text-display-md">{title}</h2>
          <div className="mt-8 hidden rounded-xl bg-paper p-6 lg:block">
            <p className="font-medium">{faqCopy.stillQuestions}</p>
            <p className="mt-2 text-[14px] text-slate">{faqCopy.stillQuestionsBody}</p>
            <ButtonLink
              href={buildWhatsAppLink(subject)}
              external
              variant="outline"
              icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
              className="mt-5"
            >
              {faqCopy.cta}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <FaqList faqs={faqs} />
          <ButtonLink
            href={buildWhatsAppLink(subject)}
            external
            variant="outline"
            icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
            className="mt-8 lg:hidden"
          >
            {faqCopy.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
