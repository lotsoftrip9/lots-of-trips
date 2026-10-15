import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <header className={cn("container-x pt-16 pb-12 text-center md:pt-24 md:pb-16", className)}>
      <Reveal onLoad className="mx-auto max-w-3xl">
        <p className="eyebrow text-saffron">{eyebrow}</p>
        <h1 className="mt-4 text-display-xl">{title}</h1>
        {description && <p className="mx-auto mt-6 max-w-2xl text-lead text-slate">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </header>
  );
}
