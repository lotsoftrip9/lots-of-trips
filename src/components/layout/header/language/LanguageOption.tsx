import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SiteLanguage } from "@/types/translate";

interface LanguageOptionProps {
  language: SiteLanguage;
  active: boolean;
  onSelect: (code: string) => void;
}

export function LanguageOption({ language, active, onSelect }: LanguageOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      lang={language.code}
      onClick={() => onSelect(language.code)}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-left ring-1 ring-inset transition-colors duration-200",
        active ? "bg-ink text-snow ring-ink" : "ring-line hover:bg-paper",
      )}
    >
      <span className="min-w-0">
        <span className="block truncate text-[15px] font-medium">{language.native}</span>
        <span className={cn("block text-[12px]", active ? "text-snow/70" : "text-slate")}>{language.label}</span>
      </span>
      {active && <Check className="size-4 shrink-0" aria-hidden />}
    </button>
  );
}
