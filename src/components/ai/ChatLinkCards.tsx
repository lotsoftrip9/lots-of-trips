import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import type { ChatLinkCard } from "@/types/chat";

export function ChatLinkCards({ cards }: { cards: ChatLinkCard[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {cards.map((card) => (
        <li key={card.href}>
          <Link
            href={card.href}
            data-va-cta="tripzy-card"
            className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-2 pr-3 transition-colors hover:border-accent/50"
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-paper">
              <AppImage image={card.image} sizes="56px" quality={70} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">{card.title}</span>
              <span className="block truncate text-xs text-slate">{card.meta}</span>
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
