import { quizQuestions } from "@/content/quiz";
import type { QuizAnswers } from "@/types/quiz";

export const describeAnswers = (answers: QuizAnswers) =>
  quizQuestions.flatMap((question) => {
    const option = answers[question.id];
    return option ? [{ label: question.summaryLabel, value: option.label }] : [];
  });

export function buildQuizMessage(answers: QuizAnswers, picks: string[]) {
  const lines = describeAnswers(answers).map(({ label, value }) => `${label}: ${value}`);
  return [
    "Hi Lots of Trips! I took the trip quiz on your website.",
    "",
    ...lines,
    "",
    `Suggested for me: ${picks.join(", ")}.`,
    "Could you help me plan it?",
  ].join("\n");
}

export function buildQuizPrompt(answers: QuizAnswers, picks: string[]) {
  const summary = describeAnswers(answers)
    .map(({ label, value }) => `${label.toLowerCase()}: ${value}`)
    .join("; ");
  return `I took the trip quiz (${summary}). It suggested ${picks.join(", ")}. Which would you pick for me, and how would you plan it?`;
}
