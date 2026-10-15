"use client";

import { Expand } from "lucide-react";
import { useState } from "react";
import { RevealImage } from "@/components/motion/RevealImage";
import { AppImage } from "@/components/ui/AppImage";
import { Lightbox } from "@/components/ui/lightbox/Lightbox";
import { REVEAL } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import type { ImageAsset } from "@/types/image";

export function PhotoGallery({ images }: { images: ImageAsset[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((image, index) => {
          const isLead = index === 0;
          return (
            <RevealImage
              key={image.src}
              delay={index * REVEAL.stagger}
              className={cn(
                "rounded-xl bg-paper",
                isLead ? "col-span-2 aspect-4/3 md:row-span-2 md:aspect-auto" : "aspect-square md:aspect-4/3",
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`View photo: ${image.alt}`}
                className="group absolute inset-0 cursor-zoom-in"
              >
                <AppImage
                  image={image}
                  sizes={isLead ? "(min-width: 768px) 52rem, 100vw" : "(min-width: 768px) 26rem, 50vw"}
                  className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                />
                <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-snow/90 text-ink opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" aria-hidden />
                </span>
              </button>
            </RevealImage>
          );
        })}
      </div>
      <Lightbox images={images} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </>
  );
}
