import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import type { Destination } from "@/types/destination";

export function NextDestination({ destination }: { destination: Destination }) {
  return (
    <section className="container-x pb-section">
      <Link
        href={`/destinations/${destination.slug}`}
        className="group grid items-center gap-6 overflow-hidden rounded-xl bg-paper p-4 sm:grid-cols-[12rem_1fr_auto] sm:p-5"
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          <AppImage
            image={destination.images[0]}
            sizes="(min-width: 640px) 12rem, 100vw"
            className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
          />
        </div>
        <div>
          <p className="text-[13px] text-slate">Next destination</p>
          <p className="mt-1 font-serif-display text-display-md">{destination.name}</p>
          <p className="mt-1 text-[15px] text-slate">{destination.tagline}</p>
        </div>
        <span className="hidden size-12 place-items-center rounded-full bg-ink text-snow transition-transform duration-300 group-hover:translate-x-1 sm:grid">
          <ArrowRight className="size-5" aria-hidden />
        </span>
      </Link>
    </section>
  );
}
