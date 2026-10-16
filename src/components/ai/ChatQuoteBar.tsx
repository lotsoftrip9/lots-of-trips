import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { tripzyCopy } from "@/content/tripzy";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";

export function ChatQuoteBar() {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line bg-paper px-4 py-2 text-[13px] sm:px-5">
      <span className="text-slate">{tripzyCopy.quoteLabel}</span>
      <a
        href={buildWhatsAppMessageLink(tripzyCopy.quoteMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 font-medium text-ink hover:text-accent"
      >
        <FaWhatsapp className="size-4 text-[#25d366]" aria-hidden />
        {tripzyCopy.quoteCta}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </div>
  );
}
