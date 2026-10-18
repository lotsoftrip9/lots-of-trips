import type { TripType } from "./destination";
import type { ImageAsset } from "./image";
import type { Difficulty } from "./tour";

export type QuizQuestionId = "when" | "mood" | "party" | "days";

export type QuizIcon =
  | "snow"
  | "spring"
  | "sun"
  | "rain"
  | "autumn"
  | "calendar"
  | "mountain"
  | "spiritual"
  | "trek"
  | "forest"
  | "lake"
  | "wildlife"
  | "couple"
  | "family"
  | "friends"
  | "solo"
  | "parents";

export interface QuizOption {
  id: string;
  label: string;
  hint: string;
  icon?: QuizIcon;
  months?: number[];
  types?: TripType[];
  days?: number;
  prefersEasy?: boolean;
  note?: string;
}

export interface QuizQuestion {
  id: QuizQuestionId;
  title: string;
  summaryLabel: string;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<QuizQuestionId, QuizOption>>;

export interface QuizCandidate {
  kind: "tour" | "destination";
  slug: string;
  name: string;
  href: string;
  meta: string;
  summary: string;
  image: ImageAsset;
  months: number[];
  types: TripType[];
  durationDays?: number;
  difficulty?: Difficulty;
}

export interface QuizPicks {
  tours: QuizCandidate[];
  destinations: QuizCandidate[];
}
