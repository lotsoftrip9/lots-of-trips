import { tripzyCopy, tripzySuggestions } from "@/content/tripzy";

export function ChatSuggestions({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="pl-11">
      <p className="mb-2 text-xs font-medium text-slate">{tripzyCopy.suggestionsLabel}</p>
      <div className="flex flex-wrap gap-2">
        {tripzySuggestions.map(({ label, prompt }) => (
          <button
            key={label}
            type="button"
            onClick={() => onPick(prompt)}
            className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-accent hover:text-ink cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
