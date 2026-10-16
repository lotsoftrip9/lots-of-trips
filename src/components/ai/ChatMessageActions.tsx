"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { tripzyCopy } from "@/content/tripzy";
import { trackEvent } from "@/lib/analytics/track";
import { looksLikePlan, markdownToPlainText } from "@/lib/utils/markdown";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";

const MAX_SHARE_LENGTH = 1800;

export function ChatMessageActions({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const plain = markdownToPlainText(content);
  const isPlan = looksLikePlan(content);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {isPlan && (
        <a
          href={buildWhatsAppMessageLink(`${tripzyCopy.sharePlanIntro}\n\n${plain.slice(0, MAX_SHARE_LENGTH)}`)}
          target="_blank"
          rel="noopener noreferrer"
          data-va-cta="tripzy-share-plan"
          onClick={() => trackEvent("tripzy_share_plan")}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1ebe5a]"
        >
          <FaWhatsapp className="size-3.5" aria-hidden />
          {tripzyCopy.sharePlan}
        </a>
      )}
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-slate transition-colors hover:bg-paper hover:text-ink cursor-pointer"
      >
        {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {copied ? tripzyCopy.copied : tripzyCopy.copy}
      </button>
    </div>
  );
}
