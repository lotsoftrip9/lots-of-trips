import { FaWhatsapp } from "react-icons/fa6";
import { tripzyCopy } from "@/content/tripzy";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";

export function ChatQuoteBar() {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line bg-paper px-4 py-2.5 sm:px-5">
      <span className="text-[13px] text-ink-soft">{tripzyCopy.quoteLabel}</span>
      <a
        href={buildWhatsAppMessageLink(tripzyCopy.quoteMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-full bg-[#25d366] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1ebe5a]"
      >
        <FaWhatsapp className="size-3.5" aria-hidden />
        {tripzyCopy.quoteCta}
      </a>
    </div>
  );
}
