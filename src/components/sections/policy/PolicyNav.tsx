import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { Policy } from "@/types/guide";

export function PolicyNav({ policies, activeSlug }: { policies: Policy[]; activeSlug: string }) {
  return (
    <nav aria-label="Policies" className="flex flex-wrap justify-center gap-2">
      {policies.map((policy) => {
        const isActive = policy.slug === activeSlug;
        return (
          <Link
            key={policy.slug}
            href={`/policies/${policy.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-[13px] font-medium ring-1 transition-colors",
              isActive ? "bg-ink text-snow ring-ink" : "text-ink-soft ring-line hover:text-ink hover:ring-ink/30",
            )}
          >
            {policy.title}
          </Link>
        );
      })}
    </nav>
  );
}
