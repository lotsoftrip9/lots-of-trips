import { RotateCcw, X } from "lucide-react";
import { tripzyCopy } from "@/content/tripzy";
import { TripzyAvatar } from "./TripzyAvatar";

interface ChatHeaderProps {
  canReset: boolean;
  onReset: () => void;
  onClose: () => void;
}

const iconButton =
  "grid size-9 place-items-center rounded-full text-slate transition-colors hover:bg-paper hover:text-ink cursor-pointer";

export function ChatHeader({ canReset, onReset, onClose }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
      <TripzyAvatar size="lg" />
      <div className="min-w-0 flex-1">
        <h2 id="tripzy-title" className="text-[15px] font-semibold tracking-tight text-ink">
          {tripzyCopy.name}
        </h2>
        <p className="flex items-center gap-1.5 text-xs text-slate">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          {tripzyCopy.role}
        </p>
      </div>
      {canReset && (
        <button type="button" onClick={onReset} aria-label="Start a new conversation" className={iconButton}>
          <RotateCcw className="size-4" />
        </button>
      )}
      <button type="button" onClick={onClose} aria-label="Close Tripzy" className={iconButton}>
        <X className="size-5" />
      </button>
    </header>
  );
}
