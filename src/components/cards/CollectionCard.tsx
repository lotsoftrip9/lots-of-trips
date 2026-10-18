import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Chevron } from "@/components/ui/ButtonLink";
import { pluralize } from "@/lib/utils/format";
import type { TripCollection } from "@/types/collection";

export function CollectionCard({ collection }: { collection: TripCollection }) {
  const counts = [pluralize(collection.destinations.length, "place"), pluralize(collection.tours.length, "journey")];

  return (
    <Link href={`/trips/${collection.slug}`} className="group block">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-paper">
        <AppImage
          image={collection.image}
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-4 px-1">
        <p className="eyebrow text-saffron">{collection.eyebrow}</p>
        <h3 className="mt-2 flex items-center gap-1 text-[1.5rem] leading-tight">
          {collection.label}
          <Chevron />
        </h3>
        <p className="mt-1 text-[15px] text-slate">{collection.teaser}</p>
        <p className="mt-2 text-[13px] text-slate">{counts.join(" · ")}</p>
      </div>
    </Link>
  );
}
