"use client";

import { Languages } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useCallback, useId, useRef, useState } from "react";
import { DEFAULT_LANGUAGE, languageCopy } from "@/content/languages";
import { useActiveLanguage } from "@/hooks/useActiveLanguage";
import { useDismiss } from "@/hooks/useDismiss";
import { cn } from "@/lib/utils/cn";
import { LanguagePanel } from "./LanguagePanel";

export function LanguageMenu({ className }: { className?: string }) {
  const active = useActiveLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);

  useDismiss(rootRef, open, close);

  return (
    <div ref={rootRef} className="notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={languageCopy.trigger}
        className={cn(
          "relative grid size-8 place-items-center rounded-full transition-colors duration-200",
          open && "bg-paper text-ink",
          className,
        )}
      >
        <Languages className="size-4" aria-hidden />
        {active !== DEFAULT_LANGUAGE && (
          <span
            aria-hidden
            className="absolute top-0 -right-1 rounded-full bg-accent px-1 text-[8px] leading-3.5 font-semibold text-white uppercase"
          >
            {active}
          </span>
        )}
      </button>

      <AnimatePresence>{open && <LanguagePanel id={panelId} active={active} onClose={close} />}</AnimatePresence>
    </div>
  );
}
