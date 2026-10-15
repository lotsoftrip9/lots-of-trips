import { DestinationCard } from "@/components/cards/DestinationCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Carousel } from "@/components/ui/Carousel";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { Destination } from "@/types/destination";
import type { CurrentWeather } from "@/types/weather";

interface DestinationGalleryProps {
  destinations: Destination[];
  total: number;
  weather: Record<string, CurrentWeather | null>;
}

export function DestinationGallery({ destinations, total, weather }: DestinationGalleryProps) {
  return (
    <section className="py-section">
      <div className="container-x">
        <SectionIntro
          label="Destinations"
          title={
            <>
              {total} places. <em>One range.</em>
            </>
          }
          action={
            <ButtonLink href="/destinations" variant="link">
              View all destinations
            </ButtonLink>
          }
        />
      </div>
      <Carousel label="Featured destinations" className="mt-12">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.slug}
            destination={destination}
            weather={weather[destination.slug]}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 40vw, 78vw"
          />
        ))}
      </Carousel>
    </section>
  );
}
