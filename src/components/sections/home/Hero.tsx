import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroSlideshow, type HeroSlide } from "./HeroSlideshow";
import { TripFinder } from "./trip-finder/TripFinder";
import type { FinderDestination } from "./trip-finder/types";

interface HeroProps {
  slides: HeroSlide[];
  destinations: FinderDestination[];
}

export function Hero({ slides, destinations }: HeroProps) {
  return (
    <HeroSlideshow slides={slides}>
      <Reveal onLoad>
        <p className="eyebrow text-[#f0d3a0] [text-shadow:0_1px_12px_rgb(0_0_0/0.5)]">Uttarakhand · Himachal Pradesh</p>
      </Reveal>
      <Reveal onLoad delay={0.1}>
        <h1 className="mt-3 max-w-4xl text-display-2xl sm:mt-5 [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
          Where the Himalaya <em className="text-[#f0d3a0]">begins.</em>
        </h1>
      </Reveal>
      <Reveal onLoad delay={0.2}>
        <p className="mt-4 max-w-xl text-lead text-white/90 [text-shadow:0_1px_16px_rgb(0_0_0/0.45)] sm:mt-6">
          Private journeys and small-group trips across the hills — planned by people who grew up
          beneath these peaks.
        </p>
      </Reveal>
      <Reveal onLoad delay={0.3} className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ButtonLink href="/tours" variant="light">
          Explore journeys
        </ButtonLink>
        <ButtonLink href="/destinations" variant="glass">
          Destinations
        </ButtonLink>
      </Reveal>

      <Reveal onLoad delay={0.45} className="mt-8 sm:mt-12 md:mt-16">
        <TripFinder destinations={destinations} />
      </Reveal>
    </HeroSlideshow>
  );
}
