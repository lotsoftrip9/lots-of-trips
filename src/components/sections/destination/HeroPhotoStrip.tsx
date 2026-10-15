"use client";

import { Images } from "lucide-react";
import { useState } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { Lightbox } from "@/components/ui/lightbox/Lightbox";
import type { ImageAsset } from "@/types/image";

const THUMBNAILS = 3;

export function HeroPhotoStrip({ images }: { images: ImageAsset[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const thumbnails = images.slice(1, THUMBNAILS + 1);

  return (
    <>
      <div className="flex items-center gap-2">
        {thumbnails.map((image, offset) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(offset + 1)}
            aria-label={`View photo: ${image.alt}`}
            className="group relative size-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/30 transition-shadow hover:ring-white sm:size-14 md:size-16"
          >
            <AppImage
              image={image}
              sizes="4rem"
              className="transition-transform duration-500 ease-out-expo group-hover:scale-110"
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="ml-auto inline-flex h-10 shrink-0 items-center gap-2 rounded-full whitespace-nowrap bg-white/10 px-4 text-[11px] font-medium tracking-[0.14em] text-white uppercase ring-1 ring-white/30 backdrop-blur-md transition-colors ring-inset hover:bg-white/20"
        >
          <Images className="size-4" aria-hidden />
          {images.length} photos
        </button>
      </div>
      <Lightbox images={images} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </>
  );
}
