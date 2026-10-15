import { DestinationCard } from "@/components/cards/DestinationCard";
import type { Destination } from "@/types/destination";

export function DestinationGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <li key={destination.slug}>
          <DestinationCard
            destination={destination}
            aspect="landscape"
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
          />
        </li>
      ))}
    </ul>
  );
}
