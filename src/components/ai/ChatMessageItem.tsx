import { tripzyCopy } from "@/content/tripzy";
import { extractLinkHrefs } from "@/lib/utils/markdown";
import type { ChatCardIndex, ChatMessage } from "@/types/chat";
import { ChatLinkCards } from "./ChatLinkCards";
import { ChatMessageActions } from "./ChatMessageActions";
import { FormattedMessage } from "./FormattedMessage";
import { TripzyAvatar } from "./TripzyAvatar";
import { TypingIndicator } from "./TypingIndicator";

const MAX_CARDS = 3;

interface ChatMessageItemProps {
  message: ChatMessage;
  isStreaming: boolean;
  cards: ChatCardIndex;
}

export function ChatMessageItem({ message, isStreaming, cards }: ChatMessageItemProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 whitespace-pre-wrap text-snow">
          {message.content}
        </p>
      </div>
    );
  }

  const isDone = !isStreaming && !message.failed && message.content !== "";
  const linkedCards = isDone
    ? extractLinkHrefs(message.content)
        .flatMap((href) => (cards[href] ? [cards[href]] : []))
        .slice(0, MAX_CARDS)
    : [];

  return (
    <div className="flex gap-3">
      <TripzyAvatar size="md" />
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex h-8 items-center gap-1.5 text-[13px] font-semibold text-ink">
          {tripzyCopy.name}
          <span className="rounded bg-paper px-1 text-[10px] font-semibold tracking-wider text-accent">
            {tripzyCopy.badge}
          </span>
        </p>
        <div className="-mt-1 text-ink-soft">
          {message.content ? <FormattedMessage content={message.content} /> : <TypingIndicator />}
        </div>
        {linkedCards.length > 0 && <ChatLinkCards cards={linkedCards} />}
        {isDone && <ChatMessageActions content={message.content} />}
      </div>
    </div>
  );
}
