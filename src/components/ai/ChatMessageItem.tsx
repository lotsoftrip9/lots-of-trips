import { tripzyCopy } from "@/content/tripzy";
import type { ChatMessage } from "@/types/chat";
import { FormattedMessage } from "./FormattedMessage";
import { TripzyAvatar } from "./TripzyAvatar";
import { TypingIndicator } from "./TypingIndicator";

export function ChatMessageItem({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 whitespace-pre-wrap text-snow">
          {message.content}
        </p>
      </div>
    );
  }

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
      </div>
    </div>
  );
}
