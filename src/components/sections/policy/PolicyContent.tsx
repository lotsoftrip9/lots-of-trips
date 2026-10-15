import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/content/site";
import { formatDate } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { Policy } from "@/types/guide";

export function PolicyContent({ policy }: { policy: Policy }) {
  const { contact } = siteConfig;

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-[13px] text-slate">Last updated {formatDate(policy.updated)}</p>
      <div className="mt-6 border-t border-line">
        {policy.sections.map((section, index) => (
          <section key={section.heading} className="grid gap-4 border-b border-line py-8 md:grid-cols-[3rem_1fr]">
            <span className="text-[13px] font-semibold text-accent tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-[1.25rem] font-medium tracking-[-0.015em]">{section.heading}</h2>
              <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-soft">
                {section.body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 rounded-xl bg-paper p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <p className="text-[15px]">Questions about this policy?</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium">
          <a
            href={buildWhatsAppLink(`your ${policy.title.toLowerCase()} policy`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-accent"
          >
            <FaWhatsapp className="size-4 text-[#25d366]" aria-hidden />
            WhatsApp us
          </a>
          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-accent">
            <Mail className="size-4 text-slate" aria-hidden />
            {contact.email}
          </a>
        </div>
      </div>
    </article>
  );
}
