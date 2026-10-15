"use client";

import { Search } from "lucide-react";
import type { Ref } from "react";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils/cn";
import styles from "./SearchTrigger.module.css";

interface SearchTriggerProps {
  ref?: Ref<HTMLButtonElement>;
  open: boolean;
  onOpen: () => void;
  className?: string;
}

export function SearchTrigger({ ref, open, onOpen, className }: SearchTriggerProps) {
  const mounted = useMounted();
  const shortcut = mounted && /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K";

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label="Search destinations and journeys"
      aria-keyshortcuts="Meta+K Control+K /"
      className={cn(styles.trigger, className)}
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <span className={styles.label}>Search</span>
      <kbd className={styles.shortcut}>{shortcut}</kbd>
    </button>
  );
}
