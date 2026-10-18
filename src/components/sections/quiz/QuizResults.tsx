"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { useAiAgent } from "@/components/ai/AiAgentContext";
import { TripzyAvatar } from "@/components/ai/TripzyAvatar";
import { ButtonLink, buttonClassName } from "@/components/ui/ButtonLink";
import { quizCopy } from "@/content/quiz";
import { buildQuizMessage, buildQuizPrompt, describeAnswers } from "@/lib/quiz/quizMessage";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";
import type { QuizAnswers, QuizPicks } from "@/types/quiz";
import { QuizResultCard } from "./QuizResultCard";

interface QuizResultsProps {
  answers: QuizAnswers;
  picks: QuizPicks;
}

export function QuizResults({ answers, picks }: QuizResultsProps) {
  const { askAgent } = useAiAgent();
  const names = [...picks.tours, ...picks.destinations].map((candidate) => candidate.name);
  const note = answers.when?.note;

  return (
    <div>
      <h3 className="text-display-md">
        {quizCopy.resultsTitle} <em>{quizCopy.resultsEmphasis}</em>
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {describeAnswers(answers).map(({ label, value }) => (
          <li key={label} className="rounded-full bg-surface px-3 py-1 text-[13px] text-ink-soft ring-1 ring-line ring-inset">
            <span className="text-slate">{label}:</span> {value}
          </li>
        ))}
      </ul>
      {note && <p className="mt-5 max-w-2xl rounded-lg bg-surface px-4 py-3 text-[14px] text-ink-soft">{note}</p>}

      <p className="eyebrow mt-10 text-slate">{quizCopy.toursLabel}</p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {picks.tours.map((candidate, index) => (
          <QuizResultCard key={candidate.slug} candidate={candidate} index={index} sizes="(min-width: 640px) 34rem, 100vw" />
        ))}
      </ul>

      <p className="eyebrow mt-10 text-slate">{quizCopy.placesLabel}</p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {picks.destinations.map((candidate, index) => (
          <QuizResultCard
            key={candidate.slug}
            candidate={candidate}
            index={index + picks.tours.length}
            sizes="(min-width: 640px) 22rem, 100vw"
          />
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <ButtonLink
          href={buildWhatsAppMessageLink(buildQuizMessage(answers, names))}
          external
          data-va-cta="quiz-whatsapp"
          icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
        >
          {quizCopy.whatsappCta}
        </ButtonLink>
        <button
          type="button"
          data-va-cta="quiz-tripzy"
          onClick={() => askAgent(buildQuizPrompt(answers, names))}
          className={buttonClassName("outline")}
        >
          <TripzyAvatar size="sm" bare className="-my-1" />
          {quizCopy.tripzyCta}
        </button>
      </div>
      <p className="mt-4 text-[13px] text-slate">{quizCopy.footnote}</p>
    </div>
  );
}
