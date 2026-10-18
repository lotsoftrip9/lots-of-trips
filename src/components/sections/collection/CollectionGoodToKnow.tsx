import { Check } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { AppImage } from "@/components/ui/AppImage";
import { collectionsCopy } from "@/content/collections";
import type { ImageAsset } from "@/types/image";

interface CollectionGoodToKnowProps {
  image: ImageAsset;
  items: string[];
}

export function CollectionGoodToKnow({ image, items }: CollectionGoodToKnowProps) {
  return (
    <section className="container-x pb-section">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <RevealImage className="aspect-4/3 rounded-xl lg:col-span-7">
          <AppImage image={image} sizes="(min-width: 1024px) 50rem, 100vw" preload />
        </RevealImage>
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="eyebrow text-saffron">{collectionsCopy.goodToKnow}</p>
          <Reveal stagger className="mt-6 space-y-5">
            {items.map((item) => (
              <RevealItem key={item} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-paper text-accent">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <p className="text-ink-soft">{item}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
