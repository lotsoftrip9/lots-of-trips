import { formatINR, pluralize, stateLabel } from "@/lib/utils/format";
import type { ChatCardIndex, ChatLinkCard } from "@/types/chat";
import { getDestinations } from "./destinations";
import { getTours } from "./tours";

export function getChatCardIndex(): ChatCardIndex {
  const destinationCards: ChatLinkCard[] = getDestinations().map((d) => ({
    href: `/destinations/${d.slug}`,
    title: d.name,
    meta: `${stateLabel(d.state)} · ${d.tagline}`,
    image: d.images[0],
  }));

  const tourCards: ChatLinkCard[] = getTours().map((t) => ({
    href: `/tours/${t.slug}`,
    title: t.title,
    meta: `${pluralize(t.durationDays, "day")} · from ${formatINR(t.priceFromINR)}`,
    image: t.cover,
  }));

  return Object.fromEntries([...destinationCards, ...tourCards].map((card) => [card.href, card]));
}
