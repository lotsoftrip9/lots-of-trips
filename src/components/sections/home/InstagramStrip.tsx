import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FaInstagram } from "react-icons/fa6";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { siteConfig } from "@/content/site";
import type { ImageAsset } from "@/types/image";

export function InstagramStrip({ images }: { images: ImageAsset[] }) {
  const { instagram } = siteConfig.social;

  return (
    <section className="container-x py-section">
      <SectionIntro
        label="On the trail with us"
        title={instagram.handle}
        description="Real trips, real mornings. Follow along for departures, trail updates and the occasional sunrise."
        action={
          <ButtonLink
            href={instagram.url}
            external
            variant="outline"
            icon={<FaInstagram className="size-4" />}
          >
            Follow on Instagram
          </ButtonLink>
        }
      />
      <Reveal stagger className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
        {images.map((image) => (
          <RevealItem key={image.src}>
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${instagram.handle} on Instagram`}
              className="group relative block aspect-square overflow-hidden rounded-xl bg-paper"
            >
              <AppImage
                image={image}
                sizes="(min-width: 768px) 13rem, 50vw"
                className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                <FaInstagram className="size-7" />
              </span>
            </a>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
