import { tripzyCopy } from "@/content/tripzy";
import { ChatSuggestions } from "./ChatSuggestions";
import { TripzyAvatar } from "./TripzyAvatar";

export function ChatWelcome({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center px-2 pt-2 text-center">
        <TripzyAvatar size="xl" className="shadow-lg shadow-black/10" />
        <h3 className="mt-4 text-xl font-medium tracking-tight text-ink">{tripzyCopy.welcomeTitle}</h3>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate">{tripzyCopy.welcomeText}</p>
      </div>
      <ChatSuggestions onPick={onPick} />
    </div>
  );
}
