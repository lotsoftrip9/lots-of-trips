import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { MapPlace } from "@/types/map";

export function MapTopBar({ place }: { place: MapPlace }) {
  return (
    <div className="relative z-10 grid h-header shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line bg-snow px-4 pt-[env(safe-area-inset-top)] md:px-6">
      <Link
        href={`/destinations/${place.slug}`}
        className="group inline-flex items-center gap-2 justify-self-start text-[12px] font-medium tracking-[0.14em] text-ink uppercase"
      >
        <span className="grid size-9 place-items-center rounded-full ring-1 ring-line transition-colors group-hover:bg-ink group-hover:text-snow">
          <ArrowLeft className="size-4" aria-hidden />
        </span>
        <span className="hidden sm:inline">Back to {place.name}</span>
        <span className="sr-only sm:hidden">Back to {place.name}</span>
      </Link>
      <Logo />
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
