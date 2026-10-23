import { RotateCcw, X } from "lucide-react";
import { tripzyCopy } from "@/content/tripzy";
import { TripzyAvatar } from "./TripzyAvatar";

interface ChatHeaderProps {
  canReset: boolean;
  onReset: () => void;
  onClose: () => void;
}

const iconButton =
  "grid size-9 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white cursor-pointer";

export function ChatHeader({ canReset, onReset, onClose }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 bg-night px-4 pt-[calc(0.875rem+env(safe-area-inset-top))] pb-3.5 text-white sm:px-5 sm:pt-3.5">
      <span className="relative">
        <TripzyAvatar size="lg" />
        <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-[#22c55e] ring-2 ring-night" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 id="tripzy-title" className="text-[15px] font-semibold tracking-tight">
            {tripzyCopy.name}
          </h2>
          <span className="text-[10px] font-semibold tracking-wider text-accent-light">{tripzyCopy.badge}</span>
        </div>
        <p className="text-xs text-white/55">{tripzyCopy.status}</p>
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
