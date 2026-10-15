"use client";

import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";
import type { Travellers } from "./types";

interface TravellerCounterProps {
  value: Travellers;
  onChange: (value: Travellers) => void;
  onDone: () => void;
}

const ROWS: { key: keyof Travellers; label: string; hint: string; min: number }[] = [
  { key: "adults", label: "Adults", hint: "Ages 13 and above", min: 1 },
  { key: "children", label: "Children", hint: "Ages 2 – 12", min: 0 },
];

const MAX = 20;

function StepButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export function TravellerCounter({ value, onChange, onDone }: TravellerCounterProps) {
  return (
    <div className="p-4 md:w-80">
      <ul className="divide-y divide-line">
        {ROWS.map(({ key, label, hint, min }) => (
          <li key={key} className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-[15px] font-medium">{label}</p>
              <p className="text-[12px] text-slate">{hint}</p>
            </div>
            <div className="flex items-center gap-3">
              <StepButton
                label={`Fewer ${label.toLowerCase()}`}
                disabled={value[key] <= min}
                onClick={() => onChange({ ...value, [key]: value[key] - 1 })}
              >
                <Minus className="size-4" aria-hidden />
              </StepButton>
              <span className="w-5 text-center text-[15px] font-semibold tabular-nums" aria-live="polite">
                {value[key]}
              </span>
              <StepButton
                label={`More ${label.toLowerCase()}`}
                disabled={value[key] >= MAX}
                onClick={() => onChange({ ...value, [key]: value[key] + 1 })}
              >
                <Plus className="size-4" aria-hidden />
              </StepButton>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onDone}
        className="mt-3 w-full rounded-full bg-ink py-2.5 text-[12px] font-medium tracking-[0.14em] text-snow uppercase transition-colors hover:bg-ink-soft"
      >
        Done
      </button>
    </div>
  );
}
