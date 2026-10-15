import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "solid" | "light" | "glass" | "outline" | "link" | "link-light";

const PILL =
  "h-10 rounded-full px-4 text-[10.5px] font-medium tracking-[0.12em] uppercase sm:h-12 sm:px-7 sm:text-[12px] sm:tracking-[0.16em]";

const VARIANTS: Record<ButtonVariant, string> = {
  solid: `${PILL} bg-ink text-snow hover:bg-ink-soft`,
  light: `${PILL} bg-white text-[#1c1b19] hover:bg-[#f2eee7]`,
  glass: `${PILL} bg-white/10 text-white ring-1 ring-white/35 ring-inset backdrop-blur-md hover:bg-white/20`,
  outline: `${PILL} text-ink ring-1 ring-ink/25 ring-inset hover:bg-ink hover:text-snow`,
  link: "text-[15px] font-medium text-accent underline-offset-4 hover:underline",
  "link-light": "text-[15px] font-medium text-accent-light underline-offset-4 hover:underline",
};

const PILL_VARIANTS = new Set<ButtonVariant>(["solid", "light", "glass", "outline"]);

export const buttonClassName = (variant: ButtonVariant, className?: string) =>
  cn(
    "group inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors duration-300 sm:gap-2",
    VARIANTS[variant],
    className,
  );

export function Chevron() {
  return (
    <ChevronRight
      aria-hidden
      className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
    />
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  external?: boolean;
}

export function ButtonLink({ children, variant = "solid", icon, external, className, ...props }: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link {...props} {...externalProps} className={buttonClassName(variant, className)}>
      {icon}
      {children}
      {!icon && (PILL_VARIANTS.has(variant) ? <span className="hidden sm:inline-flex"><Chevron /></span> : <Chevron />)}
    </Link>
  );
}
