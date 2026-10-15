"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { MAX_TRAVELLERS, TRAVELLER_ROWS } from "@/components/sections/home/trip-finder/travellerRows";
import type { Travellers } from "@/components/sections/home/trip-finder/types";
import { RollingNumber } from "@/components/ui/RollingNumber";

function StepButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      className="grid size-10 place-items-center rounded-full bg-surface ring-1 ring-line transition-colors ring-inset hover:ring-ink/30 disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </motion.button>
  );
}

export function TravellerTiles({ value, onChange }: { value: Travellers; onChange: (value: Travellers) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TRAVELLER_ROWS.map(({ key, label, hint, min }) => (
        <div key={key} className="flex items-center justify-between gap-4 rounded-xl bg-paper px-4 py-4 sm:px-5">
          <div>
            <p className="text-[15px] font-medium">{label}</p>
            <p className="text-[12.5px] text-slate">{hint}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <StepButton
              label={`Fewer ${label.toLowerCase()}`}
              disabled={value[key] <= min}
              onClick={() => onChange({ ...value, [key]: value[key] - 1 })}
            >
              <Minus className="size-4" aria-hidden />
            </StepButton>
            <RollingNumber value={value[key]} className="w-6 text-[1.25rem] font-medium" />
            <StepButton
              label={`More ${label.toLowerCase()}`}
              disabled={value[key] >= MAX_TRAVELLERS}
              onClick={() => onChange({ ...value, [key]: value[key] + 1 })}
            >
              <Plus className="size-4" aria-hidden />
            </StepButton>
          </div>
        </div>
      ))}
    </div>
  );
}
