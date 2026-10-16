import { ChevronRight, Mountain, PawPrint, Trees, Waves, type LucideIcon } from "lucide-react";
import { tripzyCopy, tripzySuggestions, type TripzySuggestionIcon } from "@/content/tripzy";

const ICONS: Record<TripzySuggestionIcon, LucideIcon> = {
  mountain: Mountain,
  waves: Waves,
  trees: Trees,
  paw: PawPrint,
};

export function ChatSuggestions({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <section>
      <h3 className="mb-2 px-1 text-eyebrow font-semibold text-accent">{tripzyCopy.suggestionsLabel}</h3>
      <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
        {tripzySuggestions.map(({ icon, title, description, prompt }) => {
          const Icon = ICONS[icon];
          return (
            <li key={title}>
              <button
                type="button"
                onClick={() => onPick(prompt)}
                className="group flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-paper cursor-pointer"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-paper text-accent transition-colors group-hover:bg-snow">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{title}</span>
                  <span className="block truncate text-xs text-slate">{description}</span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
