import { Check } from "lucide-react";
import { quoteAssurance } from "@/content/site";
import { cn } from "@/lib/utils/cn";

export function QuoteAssurance({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-3.5", className)}>
      {quoteAssurance.points.map((point) => (
        <li key={point.title} className="flex gap-2.5">
          <Check className="mt-0.75 size-4 shrink-0 text-accent" aria-hidden />
          <span className="text-[14px] leading-relaxed">
            <span className="font-medium">{point.title}</span>
            <span className="text-slate"> — {point.description}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
