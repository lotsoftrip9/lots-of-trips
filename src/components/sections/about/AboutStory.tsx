import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { AppImage } from "@/components/ui/AppImage";
import { aboutStory } from "@/content/about";
import type { ImageAsset } from "@/types/image";

export function AboutStory({ image }: { image: ImageAsset }) {
  return (
    <section className="container-x pb-section">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <RevealImage className="aspect-4/5 rounded-xl bg-paper">
          <AppImage image={image} sizes="(min-width: 768px) 40rem, 100vw" />
        </RevealImage>
        <Reveal delay={0.1}>
          <p className="eyebrow text-saffron">Our story</p>
          <h2 className="mt-3 text-display-lg">
            Born on the road out of <em>Dehradun.</em>
          </h2>
          <div className="mt-6 space-y-4 text-slate">
            {aboutStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
