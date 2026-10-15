"use client";

import { Check, Compass } from "lucide-react";
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { stateLabel } from "@/lib/utils/format";
import type { StateSlug } from "@/types/destination";
import type { FinderDestination } from "./types";

interface DestinationListProps {
  destinations: FinderDestination[];
  value: string;
  onSelect: (slug: string) => void;
}

const STATES: StateSlug[] = ["uttarakhand", "himachal"];

function moveFocus(event: KeyboardEvent<HTMLDivElement>) {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='option']"));
  const index = options.indexOf(document.activeElement as HTMLButtonElement);
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? options.length - 1
        : event.key === "ArrowDown"
          ? Math.min(index + 1, options.length - 1)
          : Math.max(index - 1, 0);
  options[next]?.focus();
}

function Option({
  selected,
  title,
  subtitle,
  onClick,
  icon,
}: {
  selected: boolean;
  title: string;
  subtitle?: string;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none transition-colors focus-visible:bg-paper",
        selected ? "bg-paper" : "hover:bg-paper",
      )}
    >
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium">{title}</span>
        {subtitle && <span className="block truncate text-[12px] text-slate">{subtitle}</span>}
      </span>
      {selected && <Check className="size-4 shrink-0 text-accent" aria-hidden />}
    </button>
  );
}

export function DestinationList({ destinations, value, onSelect }: DestinationListProps) {
  return (
    <div
      role="listbox"
      aria-label="Destination"
      onKeyDown={moveFocus}
      className="max-h-[min(24rem,55vh)] overflow-y-auto overscroll-contain p-2 md:w-80"
    >
      <Option
        selected={value === ""}
        title="Anywhere in the hills"
        subtitle="Let us suggest the best fit"
        onClick={() => onSelect("")}
        icon={
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
            <Compass className="size-4" aria-hidden />
          </span>
        }
      />
      {STATES.map((state) => (
        <div key={state} role="group" aria-label={stateLabel(state)} className="mt-2">
          <p className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-[0.2em] text-saffron uppercase">
            {stateLabel(state)}
          </p>
          {destinations
            .filter((item) => item.state === state)
            .map((item) => (
              <Option
                key={item.slug}
                selected={value === item.slug}
                title={item.name}
                subtitle={item.region}
                onClick={() => onSelect(item.slug)}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
