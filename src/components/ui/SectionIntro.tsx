import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

interface SectionIntroProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionIntro({
  label,
  title,
  description,
  action,
  align = "left",
  tone = "dark",
  className,
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn(centered ? "max-w-3xl" : "max-w-2xl")}>
        <p className="eyebrow mb-3 text-saffron">{label}</p>
        <h2 className="text-display-lg">{title}</h2>
        {description && (
          <p className={cn("mt-5 text-lead", tone === "dark" ? "text-slate" : "text-white/60")}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
