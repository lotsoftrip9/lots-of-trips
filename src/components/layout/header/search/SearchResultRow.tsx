"use client";

import { ArrowUpRight, CornerDownLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SEARCH_KIND_LABEL } from "@/lib/search/searchItems";
import type { SearchItem } from "@/types/search";
import { HighlightedText } from "./HighlightedText";
import styles from "./SearchDialog.module.css";

interface SearchResultRowProps {
  id: string;
  item: SearchItem;
  query: string;
  active: boolean;
  onHover: () => void;
  onNavigate: () => void;
}

export function SearchResultRow({ id, item, query, active, onHover, onNavigate }: SearchResultRowProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <li role="presentation">
      <Link
        ref={ref}
        id={id}
        href={item.href}
        role="option"
        aria-selected={active}
        tabIndex={-1}
        onMouseMove={onHover}
        onClick={onNavigate}
        data-active={active || undefined}
        className={styles.row}
      >
        <span className={styles.thumb}>
          <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10.5px] font-semibold tracking-[0.14em] text-saffron uppercase">
            {SEARCH_KIND_LABEL[item.kind]}
          </span>
          <span className="mt-0.5 block truncate text-[15px] font-medium tracking-[-0.01em] sm:text-[16px]">
            <HighlightedText text={item.title} query={query} />
          </span>
          <span className="mt-0.5 block truncate text-[13px] text-slate">{item.subtitle}</span>
        </span>
        <span className={styles.rowAction} aria-hidden>
          <CornerDownLeft className="hidden size-4 sm:block" />
          <ArrowUpRight className="size-4 sm:hidden" />
        </span>
      </Link>
    </li>
  );
}
