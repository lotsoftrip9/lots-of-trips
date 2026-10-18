"use client";

import { ChevronLeft, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { quizCopy, quizQuestions } from "@/content/quiz";
import { trackEvent } from "@/lib/analytics/track";
import { CUBIC } from "@/lib/motion/tokens";
import { rankCandidates } from "@/lib/quiz/rankCandidates";
import type { QuizAnswers, QuizCandidate, QuizOption } from "@/types/quiz";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestionStep } from "./QuizQuestionStep";
import { QuizResults } from "./QuizResults";

const TOTAL = quizQuestions.length;

export function TripQuiz({ candidates }: { candidates: QuizCandidate[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const done = step >= TOTAL;
  const question = quizQuestions[step];

  const choose = (option: QuizOption) => {
    const next = { ...answers, [question.id]: option };
    setAnswers(next);
    setStep(step + 1);
    if (step === TOTAL - 1) {
      trackEvent("quiz_complete", Object.fromEntries(Object.entries(next).map(([id, value]) => [id, value.id])));
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <section id="trip-quiz" className="container-x pb-section scroll-mt-28">
      <Reveal className="rounded-xl bg-paper p-5 sm:p-8 lg:p-12">
        <div className="flex min-h-9 items-center justify-between gap-4">
          <p className="eyebrow text-saffron" aria-live="polite">
            {done ? quizCopy.resultsEyebrow : quizCopy.step(step + 1, TOTAL)}
          </p>
          {done ? (
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] text-slate transition-colors hover:bg-surface hover:text-ink"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              {quizCopy.restart}
            </button>
          ) : (
            step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] text-slate transition-colors hover:bg-surface hover:text-ink"
              >
                <ChevronLeft className="size-4" aria-hidden />
                {quizCopy.back}
              </button>
            )
          )}
        </div>
        <QuizProgress value={done ? 1 : step / TOTAL} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={done ? "results" : question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: CUBIC.outExpo }}
            className="mt-8"
          >
            {done ? (
              <QuizResults answers={answers} picks={rankCandidates(candidates, answers)} />
            ) : (
              <QuizQuestionStep question={question} selectedId={answers[question.id]?.id} onSelect={choose} />
            )}
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
