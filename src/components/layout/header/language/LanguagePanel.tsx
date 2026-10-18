"use client";

import { languageCopy, languages } from "@/content/languages";
import { trackEvent } from "@/lib/analytics/track";
import { setTranslateLanguage } from "@/lib/translate/googtrans";
import { HeaderPopover } from "../HeaderPopover";
import { LanguageOption } from "./LanguageOption";

interface LanguagePanelProps {
  id: string;
  active: string;
  onClose: () => void;
}

export function LanguagePanel({ id, active, onClose }: LanguagePanelProps) {
  const select = (code: string) => {
    if (code === active) return onClose();
    trackEvent("language_change", { from: active, to: code });
    setTranslateLanguage(code);
  };

  return (
    <HeaderPopover
      id={id}
      title={languageCopy.title}
      description={languageCopy.description}
      closeLabel={languageCopy.close}
      onClose={onClose}
    >
      <div role="radiogroup" aria-label={languageCopy.title} className="mt-4 grid grid-cols-2 gap-2">
        {languages.map((language) => (
          <LanguageOption key={language.code} language={language} active={language.code === active} onSelect={select} />
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-slate">{languageCopy.note}</p>
    </HeaderPopover>
  );
}
