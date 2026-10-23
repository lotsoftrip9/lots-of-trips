import { tripzyCopy } from "@/content/tripzy";
import { ChatSuggestions } from "./ChatSuggestions";

export function ChatWelcome({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex min-h-full flex-col justify-end gap-7 pb-1">
      <div>
        <p className="text-eyebrow font-semibold text-accent">{tripzyCopy.welcomeEyebrow}</p>
        <h3 className="mt-2 text-2xl leading-tight font-medium tracking-tight text-ink">{tripzyCopy.welcomeTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">{tripzyCopy.welcomeText}</p>
      </div>
      <ChatSuggestions onPick={onPick} />
    </div>
  );
}
