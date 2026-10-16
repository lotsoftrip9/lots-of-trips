import { tripzyCopy } from "@/content/tripzy";

const DOT_DELAYS = ["[animation-delay:0ms]", "[animation-delay:150ms]", "[animation-delay:300ms]"];

export function TypingIndicator() {
  return (
    <span className="flex h-6 items-center gap-1" role="status" aria-label={tripzyCopy.thinking}>
      {DOT_DELAYS.map((delay) => (
        <span key={delay} className={`size-1.5 animate-pulse rounded-full bg-slate ${delay}`} />
      ))}
    </span>
  );
}
