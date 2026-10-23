import { tripzyCopy, tripzySuggestions } from "@/content/tripzy";

export function ChatSuggestions({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <section>
      <h4 className="mb-2.5 text-xs text-slate">{tripzyCopy.suggestionsLabel}</h4>
      <ul className="flex flex-wrap gap-2">
        {tripzySuggestions.map(({ title, prompt }) => (
          <li key={title}>
            <button
              type="button"
              onClick={() => onPick(prompt)}
              className="rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] text-ink-soft transition-colors hover:border-accent hover:text-ink cursor-pointer"
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
