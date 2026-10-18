import { CollectionCard } from "@/components/cards/CollectionCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { TripCollection } from "@/types/collection";

export function CollectionGrid({ collections }: { collections: TripCollection[] }) {
  return (
    <Reveal stagger className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => (
        <RevealItem key={collection.slug}>
          <CollectionCard collection={collection} />
        </RevealItem>
      ))}
    </Reveal>
  );
}
