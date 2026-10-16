import { RevealImage } from "@/components/motion/RevealImage";
import { AppImage } from "@/components/ui/AppImage";
import { REVEAL } from "@/lib/motion/tokens";
import type { GalleryPhoto } from "@/types/gallery";

interface GalleryGridProps {
  photos: GalleryPhoto[];
  onPhotoClick?: (index: number) => void;
}

export function GalleryGrid({ photos, onPhotoClick }: GalleryGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
      {photos.map((photo, index) => (
        <RevealImage
          key={photo.image.src}
          delay={(index % 6) * REVEAL.stagger}
          className="mb-4 break-inside-avoid rounded-xl bg-paper sm:mb-5"
          style={{ aspectRatio: `${photo.image.width} / ${photo.image.height}` }}
        >
          <button
            type="button"
            onClick={() => onPhotoClick?.(index)}
            aria-label={`View photo: ${photo.image.alt}`}
            className="group absolute inset-0 cursor-zoom-in"
          >
            <AppImage
              image={photo.image}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 py-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-[12px] font-medium text-snow">{photo.destinationName}</span>
            </span>
          </button>
        </RevealImage>
      ))}
    </div>
  );
}
