import { cn } from "@/lib/utils/cn";
import type { QuizOption } from "@/types/quiz";
import { QUIZ_ICONS } from "./quizIcons";

interface QuizOptionButtonProps {
  option: QuizOption;
  selected: boolean;
  onSelect: (option: QuizOption) => void;
}

export function QuizOptionButton({ option, selected, onSelect }: QuizOptionButtonProps) {
  const Icon = option.icon ? QUIZ_ICONS[option.icon] : null;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(option)}
      className={cn(
        "group flex h-full w-full items-center gap-4 rounded-xl bg-surface p-4 text-left ring-1 ring-inset transition-[box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgb(0_0_0/0.08)] sm:flex-col sm:items-start sm:p-5",
        selected ? "ring-2 ring-accent" : "ring-line",
      )}
    >
      {Icon && (
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-accent transition-transform duration-500 ease-out-expo group-hover:scale-110">
          <Icon className="size-5" strokeWidth={1.6} aria-hidden />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[16px] font-medium tracking-tight">{option.label}</span>
        <span className="mt-0.5 block text-[13px] text-slate">{option.hint}</span>
      </span>
    </button>
  );
}
