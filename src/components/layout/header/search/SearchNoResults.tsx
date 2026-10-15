import { ArrowRight, SearchX } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import styles from "./SearchDialog.module.css";

export function SearchNoResults({ query, onNavigate }: { query: string; onNavigate: () => void }) {
  return (
    <div className={styles.empty}>
      <span className="grid size-12 place-items-center rounded-full bg-paper text-slate">
        <SearchX className="size-5" aria-hidden />
      </span>
      <p className="mt-4 text-[16px] font-medium tracking-[-0.01em]">No matches for “{query}”</p>
      <p className="mt-1 max-w-xs text-[13.5px] text-slate">
        Try a place, a season or a kind of trip — or tell us what you have in mind and we&apos;ll plan it.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <a
          href={buildWhatsAppLink(query)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.chip}
        >
          <FaWhatsapp className="size-4 text-[#25d366]" />
          Ask on WhatsApp
        </a>
        <Link href="/destinations" onClick={onNavigate} className={styles.chip}>
          All destinations
          <ArrowRight className="size-3.5 text-slate" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
