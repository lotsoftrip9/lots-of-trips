"use client";

import { Check, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SwapText } from "@/components/ui/SwapText";
import { quoteBuilderCopy } from "@/content/quoteBuilder";
import { siteConfig } from "@/content/site";
import type { ImageAsset } from "@/types/image";

interface TripSummaryCardProps {
  title: string;
  subtitle: string;
  cover: ImageAsset;
  rows: { label: string; value: string }[];
  whatsappHref: string;
}

export function TripSummaryCard({ title, subtitle, cover, rows, whatsappHref }: TripSummaryCardProps) {
  const { contact } = siteConfig;

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[0_24px_60px_-28px_rgb(0_0_0/0.25)] ring-1 ring-line ring-inset">
      <div className="relative aspect-video bg-paper">
        <AppImage image={cover} sizes="(min-width: 1024px) 28rem, 100vw" />
      </div>
      <div className="p-6 sm:p-7">
        <p className="eyebrow text-saffron">{quoteBuilderCopy.summaryEyebrow}</p>
        <p className="mt-2 text-[1.45rem] leading-tight font-medium tracking-[-0.02em]">{title}</p>
        <p className="mt-1 text-[13px] text-slate">{subtitle}</p>

        <dl className="mt-6 divide-y divide-line border-y border-line">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-3 text-[14px]">
              <dt className="text-slate">{row.label}</dt>
              <dd className="font-medium">
                <SwapText value={row.value} />
              </dd>
            </div>
          ))}
        </dl>

        <ButtonLink
          href={whatsappHref}
          external
          icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
          className="mt-6 w-full"
        >
          {quoteBuilderCopy.cta}
        </ButtonLink>

        <ul className="mt-5 space-y-2">
          {quoteBuilderCopy.assurances.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[13px] text-slate">
              <Check className="size-3.5 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <a
          href={`tel:${contact.phoneE164}`}
          className="mt-5 flex items-center gap-2 border-t border-line pt-5 text-[14px] transition-colors hover:text-accent"
        >
          <Phone className="size-4 text-accent" aria-hidden />
          <span className="text-slate">{quoteBuilderCopy.callPrompt}</span>
          <span className="font-medium">{contact.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
