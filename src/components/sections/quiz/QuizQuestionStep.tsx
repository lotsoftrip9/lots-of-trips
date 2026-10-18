import type { QuizOption, QuizQuestion } from "@/types/quiz";
import { QuizOptionButton } from "./QuizOptionButton";

interface QuizQuestionStepProps {
  question: QuizQuestion;
  selectedId?: string;
  onSelect: (option: QuizOption) => void;
}

export function QuizQuestionStep({ question, selectedId, onSelect }: QuizQuestionStepProps) {
  return (
    <div>
      <h3 id={`quiz-${question.id}`} className="text-display-md">
        {question.title}
      </h3>
      <div
        role="radiogroup"
        aria-labelledby={`quiz-${question.id}`}
        className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {question.options.map((option) => (
          <QuizOptionButton key={option.id} option={option} selected={option.id === selectedId} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
