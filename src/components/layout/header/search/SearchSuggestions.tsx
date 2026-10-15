import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SearchItem } from "@/types/search";
import styles from "./SearchDialog.module.css";

interface SearchSuggestionsProps {
  popular: SearchItem[];
  experiences: SearchItem[];
  onNavigate: () => void;
}

export function SearchSuggestions({ popular, experiences, onNavigate }: SearchSuggestionsProps) {
  return (
    <div className={styles.suggestions}>
      <section aria-labelledby="search-popular">
        <h2 id="search-popular" className={styles.groupLabel}>
          Popular destinations
        </h2>
        <ul className={styles.tiles}>
          {popular.map((item) => (
            <li key={item.id} className={styles.tileItem}>
              <Link href={item.href} onClick={onNavigate} className={styles.tile}>
                <span className={styles.tileImage}>
                  <Image src={item.image} alt="" fill sizes="(min-width: 640px) 180px, 40vw" className="object-cover" />
                </span>
                <span className="mt-2 block truncate text-[14px] font-medium">{item.title}</span>
                <span className="block truncate text-[12px] text-slate">{item.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="search-ways" className="mt-7">
        <h2 id="search-ways" className={styles.groupLabel}>
          Ways to travel
        </h2>
        <ul className="flex flex-wrap gap-2">
          {experiences.map((item) => (
            <li key={item.id}>
              <Link href={item.href} onClick={onNavigate} className={styles.chip}>
                {item.title}
                <ChevronRight className="size-3.5 text-slate" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
