import type { QuizAnswers, QuizCandidate, QuizPicks } from "@/types/quiz";

const SEASON_MATCH = 4;
const MOOD_MATCH = 3;
const EASY_BONUS = 2;
const HARD_PENALTY = 3;
const DAY_PENALTY = 0.75;

function scoreCandidate(candidate: QuizCandidate, { when, mood, party, days }: QuizAnswers) {
  let score = 0;

  if (when?.months?.length) {
    score += candidate.months.some((month) => when.months?.includes(month)) ? SEASON_MATCH : -SEASON_MATCH;
  }

  score += candidate.types.filter((type) => mood?.types?.includes(type)).length * MOOD_MATCH;
  score += candidate.types.filter((type) => party?.types?.includes(type)).length;

  if (party?.prefersEasy && candidate.difficulty) {
    score += candidate.difficulty === "easy" ? EASY_BONUS : -HARD_PENALTY;
  }

  if (days?.days && candidate.durationDays) {
    score -= Math.min(Math.abs(candidate.durationDays - days.days), 4) * DAY_PENALTY;
  }

  return score;
}

export function rankCandidates(candidates: QuizCandidate[], answers: QuizAnswers, tourLimit = 2, placeLimit = 3): QuizPicks {
  const ranked = candidates
    .map((candidate) => ({ candidate, score: scoreCandidate(candidate, answers) }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.candidate);

  return {
    tours: ranked.filter((candidate) => candidate.kind === "tour").slice(0, tourLimit),
    destinations: ranked.filter((candidate) => candidate.kind === "destination").slice(0, placeLimit),
  };
}
