import type { ReactNode } from "react";
import { padIndex } from "@/lib/utils/format";

interface PlannerStepProps {
  index: number;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}

export function PlannerStep({ index, title, aside, children }: PlannerStepProps) {
  return (
    <section className="rounded-xl bg-surface p-5 ring-1 ring-line ring-inset sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-baseline gap-3 text-[1.1rem] font-medium tracking-[-0.015em] sm:text-[1.2rem]">
          <span className="text-[13px] font-semibold text-accent tabular-nums">{padIndex(index)}</span>
          {title}
        </h3>
        {aside}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
