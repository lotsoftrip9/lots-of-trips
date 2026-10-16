"use client";

import { ArrowUpRight } from "lucide-react";
import { askTripzyCopy } from "@/content/tripzy";
import { cn } from "@/lib/utils/cn";
import { useAiAgent } from "./AiAgentContext";
import { TripzyAvatar } from "./TripzyAvatar";

interface AskTripzyProps {
  questions: string[];
  className?: string;
}

export function AskTripzy({ questions, className }: AskTripzyProps) {
  const { askAgent } = useAiAgent();

  return (
    <aside
      aria-label="Ask Tripzy"
      className={cn(
        "flex flex-col gap-5 rounded-xl border border-line bg-paper p-5 md:flex-row md:items-center md:gap-8 md:p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3.5 md:w-72 md:shrink-0">
        <TripzyAvatar size="lg" />
        <div>
          <p className="text-[15px] font-semibold tracking-tight text-ink">{askTripzyCopy.title}</p>
          <p className="text-[13px] text-slate">{askTripzyCopy.subtitle}</p>
        </div>
      </div>
      <ul className="flex flex-1 flex-wrap gap-2">
        {questions.map((question) => (
          <li key={question}>
            <button
              type="button"
              onClick={() => askAgent(question)}
              data-va-cta="ask-tripzy"
              className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-left text-[13px] text-ink-soft transition-colors hover:border-accent hover:text-ink cursor-pointer"
            >
              {question}
              <ArrowUpRight
                className="size-3.5 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
