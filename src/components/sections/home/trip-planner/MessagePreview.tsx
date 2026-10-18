"use client";

import { CheckCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { tripPlannerCopy as copy } from "@/content/quoteBuilder";
import { siteConfig } from "@/content/site";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";
import { initials } from "@/lib/utils/format";

export function MessagePreview({ message }: { message: string }) {
  return (
    <div translate="no" className="notranslate flex h-full flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-line ring-inset">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-semibold text-snow"
        >
          {initials(siteConfig.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium">{siteConfig.name}</span>
          <span className="flex items-center gap-1.5 text-[12.5px] text-slate">
            <span aria-hidden className="size-1.5 rounded-full bg-[#25d366]" />
            {copy.replyNote}
          </span>
        </span>
        <FaWhatsapp className="size-5 shrink-0 text-[#25d366]" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col justify-end gap-3 bg-paper/60 px-5 py-8">
        <p className="mx-auto rounded-full bg-surface px-3 py-1 text-[11px] font-medium tracking-wide text-slate">
          {copy.previewLabel}
        </p>
        <div className="grid justify-items-end" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="col-start-1 row-start-1 max-w-[88%] origin-bottom-right rounded-2xl rounded-br-md bg-[#d9fdd3] px-4 py-3 text-[14.5px] leading-relaxed text-[#1c1b19] shadow-[0_1px_1px_rgb(0_0_0/0.08)]"
            >
              {message}
              <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#667781]">
                {copy.previewTime}
                <CheckCheck className="size-3.5 text-[#53bdeb]" aria-hidden />
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-line p-5">
        <ButtonLink
          href={buildWhatsAppMessageLink(message)}
          external
          icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
          className="w-full"
        >
          {copy.cta}
        </ButtonLink>
        <p className="mt-3 text-center text-[12.5px] text-slate">{copy.note}</p>
      </div>
    </div>
  );
}
