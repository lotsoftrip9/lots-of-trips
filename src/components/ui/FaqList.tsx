import { Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Faq } from "@/types/guide";

export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cn("border-t border-line", className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[16px] font-medium transition-colors hover:text-accent md:text-[17px] [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ring-1 ring-line transition-transform duration-300 ease-out-expo group-open:rotate-45">
              <Plus className="size-3.5" aria-hidden />
            </span>
          </summary>
          <p className="max-w-2xl pr-12 pb-6 text-[15px] leading-relaxed text-slate">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
