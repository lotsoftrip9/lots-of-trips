import { ArrowDownToLine, FileText } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ItineraryDownloadProps {
  slug: string;
  title: string;
  className?: string;
}

export function ItineraryDownload({ slug, title, className }: ItineraryDownloadProps) {
  return (
    <a
      href={`/tours/${slug}/itinerary.pdf`}
      download={`${slug}-itinerary.pdf`}
      aria-label={`Download the ${title} itinerary as a PDF`}
      className={cn(
        "group flex items-center gap-4 rounded-xl bg-surface p-4 ring-1 ring-line transition-colors duration-300 ring-inset hover:ring-ink/25",
        className,
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-paper text-accent">
        <FileText className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-medium">Download itinerary (PDF)</span>
        <span className="block text-[13px] text-slate">Share the day-by-day plan with family</span>
      </span>
      <ArrowDownToLine
        className="size-4 shrink-0 text-slate transition-transform duration-300 group-hover:translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}
