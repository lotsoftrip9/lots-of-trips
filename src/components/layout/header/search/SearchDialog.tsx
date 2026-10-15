"use client";

import { Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { useListNavigation } from "@/hooks/useListNavigation";
import { useScrollLock } from "@/hooks/useScrollLock";
import { CUBIC } from "@/lib/motion/tokens";
import { searchItems } from "@/lib/search/searchItems";
import { pluralize } from "@/lib/utils/format";
import type { SearchData, SearchItem } from "@/types/search";
import styles from "./SearchDialog.module.css";
import { SearchKeyHints } from "./SearchKeyHints";
import { SearchNoResults } from "./SearchNoResults";
import { SearchResultRow } from "./SearchResultRow";
import { SearchSuggestions } from "./SearchSuggestions";

interface SearchDialogProps {
  data: SearchData;
  onClose: () => void;
}

export function SearchDialog({ data, onClose }: SearchDialogProps) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchItems(data.items, query), [data.items, query]);
  const { popular, experiences } = useMemo(() => {
    const byId = new Map(data.items.map((item) => [item.id, item]));
    const pick = (ids: string[]) => ids.map((id) => byId.get(id)).filter((item): item is SearchItem => !!item);
    return { popular: pick(data.popular), experiences: pick(data.experiences) };
  }, [data]);

  const open = (item: SearchItem) => {
    onClose();
    router.push(item.href);
  };

  const { activeIndex, setActiveIndex, onKeyDown } = useListNavigation(results, open);

  useScrollLock();
  useDismiss(panelRef, true, onClose);

  const hasQuery = query.trim().length > 0;
  const optionId = (index: number) => `${listId}-option-${index}`;

  const clear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-label="Search Lots of Trips">
      <motion.div
        aria-hidden
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        ref={panelRef}
        className={styles.panel}
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.985, transition: { duration: 0.16 } }}
        transition={{ duration: 0.4, ease: CUBIC.outExpo }}
      >
        <div className={styles.bar}>
          <label className={styles.field}>
            <Search className="size-4.5 shrink-0 text-slate" aria-hidden />
            <span className="sr-only">Search destinations, journeys and ways to travel</span>
            <input
              ref={inputRef}
              autoFocus
              type="search"
              enterKeyHint="go"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="Where to? Manali, rafting, snow…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={results.length ? optionId(activeIndex) : undefined}
              className={styles.input}
            />
            {hasQuery && (
              <button type="button" onClick={clear} aria-label="Clear search" className={styles.clear}>
                <X className="size-3.5" aria-hidden />
              </button>
            )}
          </label>
          <button type="button" onClick={onClose} aria-label="Cancel search" className={styles.close}>
            <span className="sm:hidden">Cancel</span>
            <kbd className="hidden sm:inline">esc</kbd>
          </button>
        </div>

        <div className={styles.body}>
          {!hasQuery && <SearchSuggestions popular={popular} experiences={experiences} onNavigate={onClose} />}

          {hasQuery && results.length > 0 && (
            <ul id={listId} role="listbox" aria-label="Search results" className={styles.results}>
              {results.map((item, index) => (
                <SearchResultRow
                  key={item.id}
                  id={optionId(index)}
                  item={item}
                  query={query}
                  active={index === activeIndex}
                  onHover={() => setActiveIndex(index)}
                  onNavigate={onClose}
                />
              ))}
            </ul>
          )}

          {hasQuery && results.length === 0 && <SearchNoResults query={query.trim()} onNavigate={onClose} />}

          <p aria-live="polite" className="sr-only">
            {hasQuery && pluralize(results.length, "result")}
          </p>
        </div>

        <SearchKeyHints />
      </motion.div>
    </div>
  );
}
